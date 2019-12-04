const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser =  require('body-parser')
const config = require('./config/config')
const graphRouter = require('./controllers/graphController')

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

let mongoUri = config.MONGOURI

mongoose.connect(mongoUri, {useNewUrlParser: true})
console.log(`connected to db at ${mongoUri}`)

app.use(cors())
app.use(bodyParser.json())

app.use('/api/mapping/list', graphRouter)

module.exports = app
