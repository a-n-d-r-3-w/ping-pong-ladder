const { MongoClient } = require('mongodb')

const DB_URL = process.env.DB_URL
const DB_NAME = 'heroku_wjbc8kh4'

const connectRunClose = async (collectionName, fn) => {
  // noinspection JSCheckFunctionSignatures, because WebStorm doesn't know about useNewUrlParser.
  const client = await MongoClient.connect(DB_URL, { useNewUrlParser: true })
  const db = client.db(DB_NAME)
  const collection = db.collection(collectionName)
  const result = await fn(collection)

  if (client) {
    await client.close()
  }

  return result
}

module.exports = connectRunClose
