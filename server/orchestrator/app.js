const { ApolloServer, gql } = require("apollo-server")
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const PORT = process.env.PORT || 3000
// const indexRoutes = require('./routes')

// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// app.use('/', indexRoutes)

// app.listen(PORT, () => console.log('Listening on port ' + PORT))

// module.exports = app

const mergedSchemas = require("./schemas");

const server = new ApolloServer({
  schema: mergedSchemas
})

server
  .listen()
  .then(({ url }) => console.log(`server already running on ${url}`))