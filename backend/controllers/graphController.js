const graphRouter = require('express').Router()
const Graph = require('../models/graph')
const errorMsg = "Error, request failed"


graphRouter.get('/', async(request, response) => {
    try{
    const result = await Graph.find({})
    await response.json(result)
    console.log("GET ALL succesful")
    }catch{
        console.log("Getting all graphs failed ")
        response.status(400).end(errorMsg)
    }
})

graphRouter.post('/', async(request, response) => {
    const body = request.body
    console.log("Sending POST request")
    const graph = new Graph({
        json: body.json,
        name: body.name,
    })
    console.log(graph)
    try{
        if (graph){
        const result = await graph.save()
        console.log("POST was succesful")
        response.json(result)
    }
    }catch{
    response.status(400).end(console.log(errorMsg))
}
})



graphRouter.get('/:name', async(request,response) => {
    try{
    const result = await Graph.find({ "name" : request.params.name})
    await response.json(result)
    console.log("GET Graph with name succesful")
    console.log(result)
    }catch{
        console.log("GET failed")
        response.status(400).end(errorMsg)
    }
})



graphRouter.put('/:id', async(request, response) => {
    body = request.body
    console.log("Sending PUT request")
    let graph = {
        name: body.name,
        json: body.json
    }

    try{
        console.log(request.params.id)
        const result = await Graph.findByIdAndUpdate(request.params.id, graph, {new:true})
        await response.json(result)
        console.log("PUT succesful")
        console.log(result)
    }catch{
        response.status(400).end(errorMsg)
        console.log("PUT request failed")
    }
})

graphRouter.delete('/:id',async(request, response) => {
    try{
        let result = await Graph.findByIdAndDelete(request.params.id)
        response.json(result)
        console.log("DELETE was succesful")
    }catch{
        response.status(400).end(errorMsg)
    }

})


module.exports = graphRouter