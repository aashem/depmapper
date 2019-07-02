const mongoose = require('mongoose')

const graphSchema = mongoose.Schema({
    json : '',
    name : String,
})

graphSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
    }
})

const Graph = mongoose.model('Graph', graphSchema)

module.exports = Graph