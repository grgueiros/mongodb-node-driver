const { MongoClient } = require('mongodb')


const url = 'mongodb://localhost:27017/notesDb'

let db

exports.initDb = cb => {
  MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
      db = client
      cb(null, client)
    })
    .catch(error => {
      cb(error)
    })
}

exports.getDb = () => {
  return db;
}
