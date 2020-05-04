const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const mongo = require('./config/config')

mongo.connect(function (err) {
  if (!err) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use("/", require('./routes'))

    app.listen(PORT, function () {
      console.log('Listening on port ' + PORT);
    })
  }
})
