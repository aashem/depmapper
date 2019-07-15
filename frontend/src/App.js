import React,{useEffect, useState} from 'react';
import Select from 'react-select'
import {connect} from 'react-redux'
import {postJson, initializeJson, updateJson, initJsonId, removeGraphId} from './reducers/jsonReducer'
import {initCy} from './reducers/cyReducer'
import {initializeNodes} from './reducers/nodeReducer'
import {initializeEdges} from './reducers/edgeReducer'
import Header from './ui/header'
import graph from './graph/cytoscape'
import './styles/App.css'
import ListNodes from './ui/ListNodes'
import {shapeList, colorList} from './graph/nodeStyles'
//import dispatchTest from './graph/graphHandlers'

//todo split app into smaller components


/*

* tagging of notes, edges
* change of state is possible all the time
* Note / Edges have text fields
LOW PRIORITY: * https everything (edited) 
* at startup - display no graph, what for selection */

const App = (props) => {
  const shapes = shapeList()
  const colors = colorList()
  const [cy, setCy] = useState('')
  const [id, setId] = useState('0')
  const [start,setStart] = useState(true)
  const [graphNames, setGraphNames] = useState([])
  const [currName, setCurrName] = useState('new')


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
        setStart(false)
      }
    }
  if(start){
    //GET cytoscape json config from db and insert it into redux state.json
    props.initCy(cy)
    props.initializeJson()
    startFunction()

  }

  const updateElements = () => {
    props.initializeEdges(cy.edges())
    props.initializeNodes(cy.nodes())
  
  }

const clearElements = () => {
    props.initializeEdges('')
    props.initializeNodes('')
    
  }
  

  const selectGraph = value => {
    cy.nodes().remove()
    let newId = value.value
    setId(newId)
    let name = props.graph.filter(j => j.id === newId)
    setCurrName(name[0].name)
    loadGraph(newId)
    updateElements()
  }
  
  
  const saveGraph = () => {
  
    let graph = {
      json: cy.json(),
      name: currName,
    }
    console.log(graph.name  )
      if(props.graph.map(g => g.name).includes(graph.name)){
        if(window.confirm(`Already graph named ${graph.name} overwrite?`)){
          props.updateJson(id, graph)
        }
      }else{
        props.postJson(graph)
      }
   
   
  }

  const loadGraph = (newId) => {
    let graph
    if(id !== '0'|| typeof newId === typeof id){
      if (typeof newId === typeof id){
        let id = newId
        graph = props.graph.filter(j => j.id === id)
        console.log(graph[0].json)
        cy.json(graph[0].json)
        }else{
          graph = props.graph.filter(j => j.id === id)
          cy.json(graph[0].json)
          }
    }
    updateElements()
    //dispatchTest()
  }

  const addNode = (event) => {
    event.preventDefault()
      const createId = () => {
        let id = cy.nodes().size()
        id = id + 1
        return id
      }
      let id = createId()

    let added = cy.add({
      data: { id: `${id}`+ currName , name: "" },
      position: {
        x:200,
        y:200,
      },
    })
    //refactor
    //create new stylesheet for each node so properties are saved into the json
    cy.style().selector('node#' + added.id())
      .style({'background-color' : `${event.target.color.value}` || 'black', 'shape' : `${event.target.shape.value}` || 'ellipse'})
        .update()

    updateElements()
  }

  const newGraph = () => {
    let newName = window.prompt("New Graph Name:").toString()
    if(props.graph.map(g => g.name).includes(newName)){
      window.alert(`graph ${newName} exists already`)
    }else{
      setCurrName(newName)
      cy.destroy()
      setCy(graph(true))
      clearElements()
    }
 
  }

  const deleteGraph = () => {
    if(id !== '0'){
    if(window.confirm(`Delete ${currName} from app & database`)){
      cy.destroy()
      setCy(graph(true))
      props.removeGraphId(id)
      setCurrName('new')
      }else{
        console.log("no deletion")
      }
      clearElements()
    }else{
      window.alert('graph has not been saved')
    }

  }

  const renameGraph = () => {
    let name = window.prompt('Name: ')
    let graph = {
      json: cy.json(),
      name: name,
    } 
      if(id !== '0'){
        props.removeGraphId(id)
      }
      setCurrName(name)
      props.postJson(graph)
      cy.resize()
   
  }
  return (
  <div className = "Header" >
    <Header currName = {currName}></Header>
    <div className = 'Wrapper'>
    <div className = "LeftPanel">  
      <div className = 'LeftPanelLeft'>
      <h3 className = "GraphName">Graph: {currName} </h3>
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
              placeholder = 'ellipse'
              className = 'AddNodePanel'
              name = "shape"
              options = {shapes}
              >
              </Select>
              <Select
              placeholder = 'black'
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
