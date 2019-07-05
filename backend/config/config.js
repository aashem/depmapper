require('dotenv').config()

//what database to use
let MONGOURI = process.env.MONGO_URI || 'mongodb://localhost:27017/depmapper'


let PORT = process.env.PORT || 3001

module.exports = {
    MONGOURI, 
    PORT
}