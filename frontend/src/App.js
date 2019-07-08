import React,{useEffect, useState} from 'react';
import Select from 'react-select'
import {connect} from 'react-redux'
import {postJson, initializeJson, updateJson, initJsonId, removeGraphId} from './reducers/jsonReducer'
import {initCy} from './reducers/cyReducer'
import {initializeNodes} from './reducers/nodeReducer'
import {initializeEdges} from './reducers/edgeReducer'
import graphHandlers from './graph/graphHandlers'
import Header from './ui/header'
import graph from './graph/cytoscape'
import './styles/App.css'
import ListNodes from './ui/ListNodes'
import {shapeList, colorList} from './graph/nodeStyles'

//todo split app into smaller components




const App = (props) => {
  let shapes = shapeList.map(s => s = {value: s, label: s})
  let colors = colorList.map(c => c = {value: c, label: c})
  const [cy, setCy] = useState('')
  const [id, setId] = useState('')
  const [start,setStart] = useState(true)
  const [graphNames, setGraphNames] = useState([])
  const [currName, setCurrName] = useState('')


  useEffect(() => {
    //initialize cytoscape graph and set it to attribute cy
    setCy(graph())
  },[])

  setTimeout(()=> {
    updateGraphNames()
  },1000)

  const updateGraphNames = () => {
    if(props.graph){
      setGraphNames(props.graph.map(j => j = {value: j.id, label : j.name}))  
    }
  }

    const startFunction = () => {
      if(props.graph){
          //cy.json() is cytoscape method which returns the graph configuration in json
            //cy.json(props.graph) method configures graph with the json'
        //Maps graph names to a list from the db to be read by the select component
        updateGraphNames()
        graphHandlers(cy, props.initializeEdges, props.initializeNodes)
        setStart(false)
      }
    }
  if(start){
    //GET cytoscape json config from db and insert it into redux state.json
    props.initCy(cy)
    props.initializeJson()
    startFunction()

  }

  const selectGraph = value => {
    let newId = value.value
    setId(newId)
    let name = props.graph.filter(j => j.id === newId)
    setCurrName(name[0].name)
    loadGraph(newId)
    cy.resize()
  }
  
  
  const saveGraph = () => {
    let graph = {
      json: cy.json(),
      name: currName,
    }
    if(props.graph.map(g => g.name).includes(currName)){
      props.updateJson(id, graph)
    }else{
      props.postJson(graph)
    }
   
  }

  const loadGraph = (newId) => {
    let graph

    //if currName clause checks graph is selected
    if(currName){
      if (!id || typeof newId === typeof id){
      let id = newId
      graph = props.graph.filter(j => j.id === id)
      cy.json(graph[0].json)
      }else{
        graph = props.graph.filter(j => j.id === id)
        cy.json(graph[0].json)
        }
    }

  }

  const addNode = (event) => {
    cy.reset()
    event.preventDefault()
      const createId = () => {
        let id = cy.nodes().size()
        id = id + 1
        return id
      }
      let id = createId()

    let added = cy.add({
      data: { id: `${id}`, name: "" },
      position: {
        x:200,
        y:200,
      },
    })

    added.style('shape', `${event.target.shape.value}`)
    added.style('backgroundColor', `${event.target.color.value}`)
    cy.resize()
  }

  const newGraph = () => {
    let newName = window.prompt("New Graph Name:")
    setCurrName(newName)
    cy.destroy()
    setCy(graph(true))
    cy.resize()
  }

  const deleteGraph = () => {
    if(window.confirm(`Delete ${currName} from app & database`)){
      cy.destroy()
      setCy(graph(true))
      props.removeGraphId(id)
      }else{
        console.log("here")
      }
      cy.resize()

  }

  const renameGraph = () => {
    let name = window.prompt('Name: ')
    let graph = {
      json: cy.json(),
      name: name,
    }
      props.removeGraphId(id)
      props.postJson(graph)
      cy.resize()
   
  }
  return (
  <div className = "Header" >
    <Header currName = {currName}></Header>
    <div className = 'Wrapper'>
    <div className = "LeftPanel">  
      <div className = 'LeftPanelLeft'>
      <h3 className = "GraphName">Graph: {currName}</h3>
              <Select 
                placeholder = "Graph"
                className = "Select"
                name = "graph"
                onChange = {selectGraph}
                options = {graphNames}
              ></Select> 

            <ListNodes/>  
         
            </div>
            </div>
            
    <div className= "App">
      <div className = "UpperButtons">
        <button onClick = {newGraph} className = "UpperButton">New Graph</button>
        <button onClick = {deleteGraph} className = "UpperButton">Delete Graph</button>
        <button onClick = {renameGraph} className = "UpperButton">Rename Graph</button>
      </div>
      
      
    <div className="Cy"id = 'cy'></div>
            <div className = 'AddNodePanel'>
          <form onSubmit = {addNode}>
            <button type= 'submit'>Add Node</button>
              <Select
              placeholder = 'shape'
              className = 'AddNodePanel'
              name = "shape"
              options = {shapes}
              >
              </Select>
              <Select
              placeholder = 'color'
              className = 'AddNodePanel'
              name= "color"
              options = {colors}
              ></Select>
          </form>
        </div>
     
    
      <div className= "Panel">
        <button onClick ={saveGraph}>save</button>
        <button onClick = {loadGraph}>load</button>
      
      
      </div>      
    </div>
  </div>
  </div>

  )

    

}
const mapStateToProps = state => {
  return{
    graph: state.json,
  }
  
}

const mapDispatchToProps = {
  initializeNodes,
  initializeEdges,
  initializeJson,
  initCy,
  postJson,
  updateJson,
  initJsonId,
  removeGraphId,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
