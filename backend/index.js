const config = require('./config/config')
const http = require('http')
const app = require('./app')

console.log(config.PORT)

const server = http.createServer(app)

server.listen(config.PORT, () => {
    console.log(`server running on port:${config.PORT}`)
})