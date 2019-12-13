const mongoose = require('mongoose')

const graphSchema = mongoose.Schema({
    json : '',
    name : {type : String, unique: true, required: true},
})


graphSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Graph = mongoose.model('Graph', graphSchema)

module.exports = Graph