const graphRouter = require('express').Router()
const Graph = require('../models/graph')


graphRouter.get('/', async(request, response) => {
    try{
    console.log("getting1")
    const result = await Graph.find({})
    await response.json(result)
    }catch{
        console.log("getting2")
        response.status(400).end("failed")
    }
})

graphRouter.post('/', async(request, response) => {
    const body = request.body
    console.log(body)
    const graph = new Graph({
        json: body.json,
        name: body.name,
    })
    console.log(graph)
    try{
        if (graph){
        const result = await graph.save()
        console.log("posting success")
        response.json(result)
    }
}catch{
    console.log("posting failed")
    response.status(400).end('nice try!')
}
})

graphRouter.get('/:id', async(request,response) => {
    try{
    const result = await Graph.findById(request.params.id)
    await response.json(result)
    }catch{
        response.status(400).end('not quite')
    }
})

graphRouter.put('/:id', async(request, response) => {
    body = request.body
    let graph = {
        name: body.name,
        json: body.json
    }

    try{
        console.log("putting")
        const result = await Graph.findByIdAndUpdate(request.params.id, graph, {new:true})
        await response.json(result)
        console.log(result)
    }catch{
        response.status(400).end('failure')
    }
})

graphRouter.delete('/:id',async(request, response) => {
    try{
        let result = await Graph.findByIdAndDelete(request.params.id)
        response.json(result)
    }catch{
        response.status(400).end('nice try')
    }

})


module.exports = graphRouter