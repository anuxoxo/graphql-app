require("dotenv").config()
const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 8000
const app = express()

mongoose.connect(process.env.DB_URI)

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

mongoose.connect(process.env.DB_URI)
  .then(() => { app.listen(PORT, console.log("Server connected to localhost ", PORT)) })
  .catch(err => console.log(err.message))