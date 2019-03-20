require('dotenv').config()
const restify = require('restify')
const HttpStatus = require('http-status-codes')
const shortid = require('shortid')
const corsMiddleware = require('restify-cors-middleware')

const connectRunClose = require('./connectRunClose')

const server = restify.createServer()

server.use(restify.plugins.bodyParser())

// Enable CORS
const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight)
server.use(cors.actual)

/*
Data types:

 - A player is an object like this:
   {
     _id: <MongoDB document ID>
     playerId: 'IyNUaA1Ya',
     name: 'Lieutenant Data',
     rank: 6
   }

*/

const Collection = Object.freeze({
  PLAYERS: 'players',
  TEAMS: 'teams',
  PLAYER_SWAPS: 'playerSwaps',
  TEAM_SWAPS: 'teamSwaps'
});

// Health
server.get('/api/health', (req, res, next) => {
  res.send(HttpStatus.OK, 'App is okay.')
  next()
})

const getSorted = async collectionName =>
  await connectRunClose(collectionName, players => players.find({}, { sort: [['rank', 1]] }).toArray())
const getSortedPlayers = async () => await getSorted(Collection.PLAYERS)
const getSortedTeams = async () => await getSorted(Collection.TEAMS)

const getSwaps = collectionName => async (req, res, next) => {
  const swaps = await connectRunClose(collectionName,
      swaps => swaps.find({}, { sort:  [['timestamp', -1]], limit: 5 }).toArray())
  res.send(HttpStatus.OK, swaps)
  next()
}
server.get('/api/playerSwaps', getSwaps(Collection.PLAYER_SWAPS))
server.get('/api/teamSwaps', getSwaps(Collection.TEAM_SWAPS))

// Get all players
server.get('/api/players', async (req, res, next) => {
  await cleanUpPlayerRanks()
  const players = await getSortedPlayers()
  res.send(HttpStatus.OK, players)
  next()
})

// Get all teams
server.get('/api/teams', async (req, res, next) => {
  await cleanUpTeamRanks()
  const teams = await getSortedTeams()
  res.send(HttpStatus.OK, teams)
  next()
})

// Create player
server.post('/api/players', async (req, res, next) => {
  if (!req.body) {
    res.send(HttpStatus.BAD_REQUEST, 'Name is missing.')
    next()
    return
  }

  const { name } = req.body
  if (name.trim().length === 0) {
    res.send(HttpStatus.BAD_REQUEST, 'Name is empty.')
    next()
    return
  }

  const playerId = shortid.generate()
  await cleanUpPlayerRanks()
  const players = await getSortedPlayers()
  const rank = players.length + 1
  const result = await connectRunClose(Collection.PLAYERS, players => players.insertOne({ playerId, name, rank }))
  if (result.result.ok === 1) {
    res.send(HttpStatus.CREATED, { playerId })
    next()
    return
  }
  res.send(HttpStatus.INTERNAL_SERVER_ERROR)
  next()
})

// Create team
server.post('/api/teams', async (req, res, next) => {
  if (!req.body) {
    res.send(HttpStatus.BAD_REQUEST, 'Name is missing.')
    next()
    return
  }

  const { name } = req.body
  if (name.trim().length === 0) {
    res.send(HttpStatus.BAD_REQUEST, 'Name is empty.')
    next()
    return
  }

  const teamId = shortid.generate()
  await cleanUpTeamRanks()
  const teams = await getSortedTeams()
  const rank = teams.length + 1
  const result = await connectRunClose(Collection.TEAMS, teams => teams.insertOne({ teamId, name, rank }))
  if (result.result.ok === 1) {
    res.send(HttpStatus.CREATED, { teamId })
    next()
    return
  }
  res.send(HttpStatus.INTERNAL_SERVER_ERROR)
  next()
})

// Swap player ranks
server.post('/api/playerSwaps', async (req, res, next) => {
  if (!req.body) {
    res.send(HttpStatus.BAD_REQUEST, 'Player IDs are missing.')
    next()
    return
  }

  const { player1Id, player2Id } = req.body
  if (!player1Id || !player2Id) {
    res.send(HttpStatus.BAD_REQUEST, 'Missing player IDs.')
    next()
    return
  }

  const player1 = await connectRunClose(Collection.PLAYERS, players => players.findOne({ playerId: player1Id }))
  const player2 = await connectRunClose(Collection.PLAYERS, players => players.findOne({ playerId: player2Id }))

  const player1NewRank = player2.rank
  const player2NewRank = player1.rank

  let winner, loser
  if (player1NewRank < player2NewRank) {
    winner = player1
    loser = player2
  } else {
    winner = player2
    loser = player1
  }

  await connectRunClose(Collection.PLAYERS, players => players.updateOne(
    { playerId: player1Id },
    { $set: { rank: player1NewRank } }))
  await connectRunClose(Collection.PLAYERS, players => players.updateOne(
    { playerId: player2Id },
    { $set: { rank: player2NewRank } }))

  // Record swap
  const timestamp = Date.now()

  await connectRunClose(Collection.PLAYER_SWAPS, swaps => swaps.insertOne({
    timestamp,
    winnerName: winner.name,
    winnerRank: Math.min(player1.rank, player2.rank),
    loserName: loser.name,
    loserRank: Math.max(player1.rank, player2.rank),
  }))

  res.send(HttpStatus.NO_CONTENT)
  next()
})

// Swap team ranks
server.post('/api/teamSwaps', async (req, res, next) => {
  if (!req.body) {
    res.send(HttpStatus.BAD_REQUEST, 'Player IDs are missing.')
    next()
    return
  }

  const { team1Id, team2Id } = req.body
  if (!team1Id || !team2Id) {
    res.send(HttpStatus.BAD_REQUEST, 'Missing player IDs.')
    next()
    return
  }

  const team1 = await connectRunClose(Collection.TEAMS, teams => teams.findOne({ playerId: team1Id }))
  const team2 = await connectRunClose(Collection.TEAMS, teams => teams.findOne({ playerId: team2Id }))

  const team1NewRank = team2.rank
  const team2NewRank = team1.rank

  let winner, loser
  if (team1NewRank < team2NewRank) {
    winner = team1
    loser = team2
  } else {
    winner = team2
    loser = team1
  }

  await connectRunClose(Collection.TEAMS, teams => teams.updateOne(
    { teamId: team1Id },
    { $set: { rank: team1NewRank } }))
  await connectRunClose(Collection.TEAMS, teams => teams.updateOne(
    { teamId: team2Id },
    { $set: { rank: team2NewRank } }))

  // Record swap
  const timestamp = Date.now()

  await connectRunClose(Collection.TEAM_SWAPS, swaps => swaps.insertOne({
    timestamp,
    winnerName: winner.name,
    winnerRank: Math.min(team1.rank, team2.rank),
    loserName: loser.name,
    loserRank: Math.max(team1.rank, team2.rank),
  }))

  res.send(HttpStatus.NO_CONTENT)
  next()
})

const cleanUpPlayerRanks = async () => {
  const players = await getSortedPlayers()
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const { playerId } = player;
    await connectRunClose(Collection.PLAYERS, players => players.updateOne(
      { playerId },
      {
        $set: {
          rank: i + 1,
          pingPongLadderId: playerId
        }
      }
      )
    )
  }
}

const cleanUpTeamRanks = async () => {
  const teams = await getSortedTeams()
  for (let i = 0; i < teams.length; i++) {
    const team = teams[i];
    const { teamId } = team;
    await connectRunClose(Collection.TEAMS, teams => teams.updateOne(
      { teamId },
      { $set: { rank: i + 1 } }))
  }
}

// Delete specific player
server.del('/api/players/:playerId', async (req, res, next) => {
  const { playerId } = req.params
  await connectRunClose(Collection.PLAYERS, players => players.deleteOne({ playerId }))
  await cleanUpPlayerRanks()
  res.send(HttpStatus.NO_CONTENT)
  next()
})

// Delete specific team
server.del('/api/teams/:teamId', async (req, res, next) => {
  const { teamId } = req.params
  await connectRunClose(Collection.TEAMS, teams => teams.deleteOne({ teamId }))
  await cleanUpTeamRanks()
  res.send(HttpStatus.NO_CONTENT)
  next()
})

server.get('*', restify.plugins.serveStatic({ directory: 'build', default: 'index.html' }));

let port = process.env.PORT
if (port == null || port === '') {
  port = 8000
}

server.listen(port, function () {
  console.info('%s listening at %s', server.name, server.url)
})
