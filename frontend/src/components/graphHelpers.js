import React from 'react'
import Button from '@material-ui/core/Button'
import jsonServices from '../services/jsonServices'
import Select from 'react-select'

export const SaveGraph = (props) => {
    let currName = props.currName
    let cy = props.cy
    let propsGraph = props.propsGraph
    let postJson = props.postJson
    let updateJson = props.updateJson

    const saveGraph = async() => {
    if (props.cy){
    console.log(cy.json())
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

  export const NewGraph = (props) => {
    let cy = props.cy
    let setCurrName = props.setCurrName
    let clearElements = props.clearElements
    let setInitHandler = props.setInitHandler
    let propsGraph = props.stateGraph
    const newGraph = () => {
    let newName = window.prompt("New Graph Name:")
    if(newName){
      if(propsGraph.map(g => g.name).includes(newName)){
        window.alert(`graph ${newName} exists already`)
      }else{
        setCurrName(newName)
        clearElements()
        cy.nodes().remove()
        setInitHandler(true)
      }
    }
    }
    
    return  <Button onClick = {newGraph} className = "UpperButtons">New Graph</Button>
  }

  export const DeleteGraph = (props) => {
    let id = props.id
    let currName = props.currName
    let cy = props.cy
    let setCy = props.setCy
    let graph = props.initGraph
    let setCurrName = props.setCurrName
    let clearElements = props.clearElements
    let removeGraphId = props.removeGraphId

    const deleteGraph = () => {
        if(id !== '0'){
          if(window.confirm(`Delete ${currName} from app & database`)){
            cy.destroy()
            setCy(graph(true))
            removeGraphId(id)
            setCurrName('new')
          }else{
            console.log("no deletion")
          }
          clearElements()
        }else{
          window.alert('graph has not been saved')
            
        }

    }
    return <Button onClick = {deleteGraph} className = "UpperButtons">Delete Graph</Button>
  }

  
 export const RenameGraph = (props) => {
    let id = props.id
    let cy = props.cy
    let removeGraphId = props.removeGraphId
    let setCurrName = props.setCurrName
    let postJson = props.postJson

  const renameGraph = () => {
    if (cy){
      let name = window.prompt('Name: ')
      let graph = {
        json: cy.json(),
        name: name,
    } 
    if(id !== '0'){
      removeGraphId(id)
    }
    setCurrName(name)
    postJson(graph)
    cy.nodes().unselect()
    }
    }
    return <Button onClick = {renameGraph} className = "UpperButtons">Rename Graph</Button>
  }

 export const SelectGraph = (props) => {
  let graph = props.graphDispatch
  let graphNames = props.graphs
  let cy = props.cy
  let updateElements = props.update
  let setId = props.setId
  let setCurrName = props.setCurrName
  let loadGraph = props.loadGraph

  const selectGraph = value => {
      cy.nodes().unselect()
      cy.nodes().remove()
      let newId = value.value
      setId(newId)
      let name = graph.filter(j => j.id === newId)
      setCurrName(name[0].name)
      loadGraph(newId)
      updateElements()
      cy.nodes().forEach(e => e.style({backgroundColor: e.data('background-color')}))
    }
  return(
      <Select 
      placeholder = "Graph"
      className = "Select"
      name = "graph"
      onChange = {selectGraph}
      options = {graphNames}
    ></Select> 
  )
} 
