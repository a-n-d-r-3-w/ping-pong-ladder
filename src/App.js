import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  createPlayer,
  getPlayers,
  deletePlayer,
  swapRanks,
  getSwaps,
} from './actions';
import diskun from './images/diskun.png'

const rankString = number => {
  if (number === 1) {
    return '1st';
  }
  if (number === 2) {
    return '2nd';
  }
  if (number === 3) {
    return '3rd';
  }
  if (number === 21) {
    return '21st';
  }
  if (number === 22) {
    return '22nd';
  }
  if (number === 23) {
    return '23rd';
  }
  if (number === 31) {
    return '31st';
  }
  if (number === 32) {
    return '32nd';
  }
  if (number === 33) {
    return '33rd';
  }
  if (number === 41) {
    return '41st';
  }
  if (number === 42) {
    return '42nd';
  }
  if (number === 43) {
    return '43rd';
  }
  if (number === 51) {
    return '51st';
  }
  if (number === 52) {
    return '52nd';
  }
  if (number === 53) {
    return '53rd';
  }
  return `${number}th`;
}

const timeString = timestamp => new Date(timestamp).toLocaleTimeString('en-US', {
  weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
})

const takesString = () => {
  const synonyms = [
    'takes',
    'grabs',
    'steals',
    'seizes',
    'plucks',
    'snags',
    'swipes',
    'nabs',
    'snatches',
    'clinches',
    'captures',
    'earns',
    'attains',
    'acquires',
    'secures',
  ]
  const randomIndex = Math.floor(Math.random() * synonyms.length)
  return synonyms[randomIndex]
}

const goToGithub = () => {
   window.location.href = 'https://github.com/a-n-d-r-3-w/ping-pong-ladder'
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      markedPlayer: null,
      isRulesShowing: false,
    }
    this.handleToggleRulesButtonClick = this.handleToggleRulesButtonClick.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleMarkButtonClick = this.handleMarkButtonClick.bind(this);
  }

  handleToggleRulesButtonClick () {
    this.setState(state => ({ isRulesShowing: !state.isRulesShowing }));
  }

  handleAddButtonClick () {
    const name = window.prompt("Enter name:");
    if (!name) {
      return;
    }
    this.props.createPlayer(name);
  }

  handleMarkButtonClick (player) {
    return () => {
      if (!this.state.markedPlayer) {
        this.setState({ markedPlayer: player });
        return;
      }
      const player1 = this.state.markedPlayer;
      const player2 = player;
      const confirmed = window.confirm(`Swap ${player1.name} and ${player2.name}?`);
      if (confirmed) {
        this.props.swapRanks(player1.playerId, player2.playerId);
      }
      this.setState({ markedPlayer: null });
    };
  }

  handleDeleteButtonClick ({name, playerId}) {
    return () => {
      const confirmed = window.confirm(`Delete ${name}?`);
      if (confirmed) {
        this.props.deletePlayer(playerId);
      }
    };
  }

  componentDidMount () {
    this.props.getSwaps();
    this.props.getPlayers();
  }

  render() {
    const { isLoading, players, swaps } = this.props;
    const { isRulesShowing } = this.state;
    const title = <div style={{ marginBottom: '1em' }}>
      <h1 style={{ margin: '1em 0', textAlign: 'center' }}>
        <img src={diskun} alt="diskun" />
        Ping-Pong Ladder
      </h1>
      <button
        className="btn btn-sm btn-link"
        onClick={this.handleToggleRulesButtonClick}
      >
        {isRulesShowing ? 'Hide' : 'Show'} rules
      </button>
      <button
        className="btn btn-sm btn-link"
        onClick={goToGithub}
        style={{ marginLeft: "2em" }}
      >
        Github
      </button>
      {
        isRulesShowing &&
        <ul style={{margin: '1em 0'}}>
          <li>Any player can challenge a player <em>within 3 rungs above</em> them on the ladder.</li>
          <li>These challenges generally should not or can not be declined.</li>
          <li>If the lower-placed player wins the match, then the two players swap places on the ladder.</li>
          <li>
            If the lower-placed player loses, then they may not challenge the same person again without challenging
            someone else first.
          </li>
          <li>Have fun!</li>
        </ul>
      }
    </div>;

    if (isLoading || !players) {
      return (
        <Fragment>
          {title}
          <div>Loading...</div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        {title}
        <table className="table">
          { swaps.map(swap => (
            <div style={{ margin: "1em 0" }}>
              {timeString(swap.timestamp)}:<br />
              {swap.winnerName} (#{swap.loserRank}) {takesString()} the #{swap.winnerRank} spot from {swap.loserName}!
            </div>
          )) }
        </table>
        <table className="table">
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
          {
            this.props.players.map(player => {
              const isMarked = this.state.markedPlayer && (this.state.markedPlayer.playerId === player.playerId);
              return (
                <tr
                  className={isMarked ? 'table-active' : ''}>
                  <td>{rankString(player.rank)}</td>
                  <td>{player.name}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-sm btn-link"
                        onClick={this.handleMarkButtonClick(player)}
                        disabled={isMarked}
                      >
                        Mark for swap
                      </button>
                      <button
                        className="btn btn-sm btn-link text-secondary"
                        onClick={this.handleDeleteButtonClick(player)}
                        disabled={isMarked}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>);
            })
          }
        </table>
        <button
          type='button'
          className="btn btn-outline-secondary"
          onClick={this.handleAddButtonClick}
          style={{margin: '1em 0 10em 0'}}
        >
          Add player
        </button>
      </Fragment>);
  }
}

App.propTypes = {
  createPlayer: PropTypes.func.isRequired,
  deletePlayer: PropTypes.func.isRequired,
  getPlayers: PropTypes.func.isRequired,
  swapRanks: PropTypes.func.isRequired,
  getSwaps: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  players: state.players,
  swaps: state.swaps
});

const mapDispatchToProps = dispatch => ({
  createPlayer: name => dispatch(createPlayer(name)),
  deletePlayer: playerId => dispatch(deletePlayer(playerId)),
  getPlayers: () => dispatch(getPlayers()),
  swapRanks: (player1Id, player2Id) => dispatch(swapRanks(player1Id, player2Id)),
  getSwaps: () => dispatch(getSwaps()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
