import React from 'react'
import Button from '@material-ui/core/Button'
import jsonServices from '../services/jsonServices'

export const SaveGraph = (props) => {
    let currName = props.currName
    let cy = props.cy
    let propsGraph = props.propsGraph
    let postJson = props.postJson
    let updateJson = props.updateJson

    const saveGraph = async() => {
    if (props.cy){
    let graph = {
      json: cy.json(),
      name: currName,
    }
      if(propsGraph.map(g => g.name).includes(graph.name)){
        if(window.confirm(`Already graph named ${graph.name} overwrite?`)){
          let targetGraph = await jsonServices.getByName(currName)
          let id = targetGraph[0].id
          updateJson(id, graph)
        }
      }else{
        postJson(graph)
      }

     
      }
    }
      return <Button onClick ={saveGraph}>save</Button>
 
   
  }