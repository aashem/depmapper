const config = require('./config/config')
const http = require('http')
const app = require('./app')
const https = require('https')
const fs = require('fs')

console.log(config.PORT)

const server = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
},app)

server.listen(config.PORT, () => {
    console.log(`server running on port:${config.PORT}`)
})