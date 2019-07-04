require('dotenv').config()

//what database to use
let MONGOURI = process.env.MONGO_URI || 'mongodb://localhost:27017/depmapper'

//Process.env.PORT is specific port chosen in ENV , 27017 = default mongodb port
let PORT = process.env.PORT || 3001

module.exports = {
    MONGOURI, 
    PORT
}