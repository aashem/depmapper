const config = require('./config/config')
const http = require('http')
const app = require('./app')
const https = require('https')
const fs = require('fs')
const key1 = '../proxy/data/archive/gwiki.cs-aware.eu/privkey1.pem'
const cert1 = '../proxy/data/archive/gwiki.cs-aware.eu/fullchain1.pem'

console.log(config.PORT)
console.log("certificates located at")
console.log(key1)
console.log(cert1)

const server = https.createServer({
    key: fs.readFileSync(key1),
    cert: fs.readFileSync(cert1)
},app)

server.listen(config.PORT, () => {
    console.log(`server running on port:${config.PORT}`)
})