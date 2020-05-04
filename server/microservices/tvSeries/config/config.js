const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "native-fox-entertainMe"
var db

function connect(callback) {
  client.connect(err => {
    if (err) {
      console.log("Connection to mongodb failed", err);
    } else {
      console.log(('Successfully Connect to mongodb'));
      db = client.db(dbName)
    }
    callback(err)
  });
}

function getDatabase() {
  return db
}

module.exports = {
  connect, getDatabase
}  