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
import StyleEditor from './ui/styleEditor'
import jsonServices from './services/jsonServices'
import Button from '@material-ui/core/Button'
import ListEdges from './ui/ListEdges'
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
        cy.on('resize', (event) => {
          updateElements()
      })
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
    cy.nodes().unselect()
    cy.nodes().remove()
    let newId = value.value
    setId(newId)
    let name = props.graph.filter(j => j.id === newId)
    setCurrName(name[0].name)
    loadGraph(newId)
    updateElements()
  }
  
  
  const saveGraph = async() => {
  
    let graph = {
      json: cy.json(),
      name: currName,
    }
      if(props.graph.map(g => g.name).includes(graph.name)){
        if(window.confirm(`Already graph named ${graph.name} overwrite?`)){
          let targetGraph = await jsonServices.getByName(currName)
          let id = targetGraph[0].id
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
    let id = cy.nodes().size()
 
      const createId = () => {
        id = id + 1
        return id
      }
      id = createId()
    while(cy.nodes().map(n => n.id()).includes(id.toString())){
     id = createId()
    }
 
    let added = cy.add({
      data: { id: `${id}` , name: "" },
      position: {
        x:200,
        y:200,
      },
    })
    //refactor
    //create new stylesheet for each node so properties are saved into the json
    cy.style().selector('node#' + added.id())
      .style({'background-color' : `${event.target.color.value}` || 'black', 'shape' : `${event.target.shape.value}` || 'ellipse', 'border-style' : 'solid', 'border-width' : '2px'})
        .update()

    updateElements()
  }

  const newGraph = () => {
    let newName = window.prompt("New Graph Name:")
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
      cy.nodes().unselect()
  }

  
  return (
    
  <div className = "Header" >
    <Header currName = {currName}></Header>
    <div className = 'Wrapper'>
    <div className = "LeftPanel">  
    
      <h3 className = "GraphName">Graph: {currName} </h3>
              <Select 
                placeholder = "Graph"
                className = "Select"
                name = "graph"
                onChange = {selectGraph}
                options = {graphNames}
              ></Select> 
     <div className = 'Lists'>
            <ListNodes/> 
            <ListEdges/>
            </div>
            </div>
            
    <div className= "App">
      <div className = "UpperButtons">
        <Button onClick = {newGraph} className = "UpperButtons">New Graph</Button>
        <Button onClick = {deleteGraph} className = "UpperButtons">Delete Graph</Button>
        <Button onClick = {renameGraph} className = "UpperButtons">Rename Graph</Button>
      </div>
      
      
    <div className="Cy"id = 'cy'></div>
            <div className = 'AddNodePanel'>
              <div className = 'AddNodePanelLeft'>
          <form onSubmit = {addNode}>
            <Button type= 'submit'>Add Node</Button>
            
              <Select
              placeholder = 'ellipse'
              className = 'AddNodePanelLeftSelect'
              name = "shape"
              options = {shapes}
              >
              </Select>
              <Select
              placeholder = 'black'
              className = 'AddNodePanelLeftSelect'
              name= "color"
              options = {colors}
              ></Select>
          </form>
          </div>
          <div className = 'AddNodePanelRight'>
          <StyleEditor/>
          </div>
        </div>
        
    
      <div className= "Panel">
        <Button onClick ={saveGraph}>save</Button>
        <Button onClick = {loadGraph}>load</Button>
      
      
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
