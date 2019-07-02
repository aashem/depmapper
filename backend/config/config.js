require('dotenv').config()

let MONGOURI = process.env.MONGO_URI
let PORT = process.env.PORT

module.exports = {
    MONGOURI, 
    PORT
}