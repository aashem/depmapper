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



const App = (props) => {
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
    if (!id || typeof newId === typeof id){
     let id = newId
     let graph = props.graph.filter(j => j.id === id)
     cy.json(graph[0].json)
    }else{
      let graph = props.graph.filter(j => j.id === id)
      cy.json(graph[0].json)
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

    cy.add({
      data: { id: `${id}`, name: "" },
      position: {
        x:200,
        y:200,
      },
    })
  }

  const newGraph = () => {
    let newName = window.prompt("New Graph Name:")
    setCurrName(newName)
    cy.destroy()
    setCy(graph(true))
    
  }

  const deleteGraph = () => {
    if(window.confirm(`Delete ${currName} from app & database`)){
      cy.destroy()
      setCy(graph(true))
      props.removeGraphId(id)
      }else{
        console.log("here")
      }

  }

  const renameGraph = () => {
    let name = window.prompt('Name: ')
    let graph = {
      json: cy.json(),
      name: name,
    }
      props.removeGraphId(id)
      props.postJson(graph)
   
  }
  return (
  <div className = "Header" >
    <Header currName = {currName}></Header>
    <div className= "App">
      <div className = "UpperButtons">
        <button onClick = {newGraph} className = "UpperButton">New Graph</button>
        <button onClick = {deleteGraph} className = "UpperButton">Delete Graph</button>
        <button onClick = {renameGraph} className = "UpperButton">Rename Graph</button>
      </div>
    <div className="Cy"id = 'cy' ></div>
      <form>
          <Select 
          className = "Select"
          name = "graph"
          onChange = {selectGraph}
          options = {graphNames}
          ></Select>
      </form>
      <div className= "Panel">
        <button onClick ={saveGraph}>save</button>
        <button onClick = {loadGraph}>load</button>
        <button onClick = {addNode}>Add Node</button>
          <div className = "Lists">
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
