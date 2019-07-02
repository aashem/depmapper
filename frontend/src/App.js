import React,{useEffect, useState} from 'react';
import Select from 'react-select'
import {connect} from 'react-redux'
import {postJson, initializeJson, updateJson, initJsonId, removeGraphId} from './reducers/jsonReducer'
import {initializeNodes} from './reducers/nodeReducer'
import {initializeEdges} from './reducers/edgeReducer'
import ListNodes from './components/ListNodes'
import graph from './graph/cytoscape'
import getNodeInfo from './components/getNodeInfo'
import './styles/App.css'
import getEdgeInfo from './components/getEdgeInfo';
import ListEdges from './components/ListEdges'


const Header = (currName) => {
  let name = currName.currName
  console.log(name)

  return <div>DepMapper
    <a href="https://github.com/aashem/depmap-secret.git"> Git</a>
    <h2>Selected Graph : {name}</h2>
  </div>
}


const App = (props) => {
  const [cy, setCy] = useState('')
  const [id, setId] = useState('')
  const [start,setStart] = useState(true)
  const [graphNames, setGraphNames] = useState([])
  const [currName, setCurrName] = useState('')
  let list = ["circle","square", "triangle", "star"]
  let shapeList = list.map(s => s = {value:  s, label: s})

  useEffect(() => {
    //initialize cytoscape graph and set it to attribute cy
    setCy(graph())
  },[])

  const updateGraphNames = () => {
    setGraphNames(props.graph.map(j => j = {value: j.id, label : j.name}))
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
    props.initializeJson()
    startFunction()

  }

 
  

  const initNodes = () => {
    //set redux state.nodes to current nodes 
    props.initializeNodes(getNodeInfo(cy))
  }

  const initEdges = () => {
    props.initializeEdges(getEdgeInfo(cy))
    
  }

  const graphStateHandlers = (cy) => {
    //adds cytoscape eventListeners that synchronize state with graph
    cy.on('add', () => {
      if(!start){
        initNodes()
      }
    })
    cy.on('data', () => {
      initNodes()
      initEdges()
  })
  }

  if(cy && start){
    graphStateHandlers(cy)   
  }

  const selectGraph = value => {
    console.log(value)
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
    event.preventDefault()
      const createId = () => {
        let id = cy.nodes().size()
        id = id + 1
        return id
      }
      let id = createId()

    cy.add({
      data: { id: `${id}`, name: "new" },
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
  return (
  <div >
    <Header currName = {currName}></Header>
    <div className= "App">
      <button onClick = {newGraph}>New Graph</button>
      <button onClick = {deleteGraph}>Delete Graph</button>
    <div className="Cy"id = 'cy' ></div>
    <hr></hr>
    <div className= "Panel">
      <form>
        <Select
        name = "graph"
        onChange = {selectGraph}
        options = {graphNames}
        ></Select>
        </form>
        <button onClick ={saveGraph}>save</button>
        <button onClick = {loadGraph}>load</button>
      <div>
        <p></p>
        <form onSubmit = {addNode}>
          <button type = "submit">Add Node</button>
      </form>
    </div>
    <p></p>
    <div className = "Lists">
      <ListNodes/>
      <ListEdges/>
    </div>
    </div>
    </div>
  </div>
  )

    

}
const mapStateToProps = state => {
  return{
    graph: state.json
  }
  
}

const mapDispatchToProps = {
  initializeNodes,
  initializeEdges,
  initializeJson,
    postJson,
    updateJson,
    initJsonId,
    removeGraphId,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
