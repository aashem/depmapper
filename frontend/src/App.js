import React,{useEffect, useState} from 'react';
import Select from 'react-select'
import {connect} from 'react-redux'
import {postJson, initializeJson, updateJson, initJsonId, removeGraphId} from './reducers/jsonReducer'
import {initCy} from './reducers/cyReducer'
import {initializeNodes} from './reducers/nodeReducer'
import {initializeEdges} from './reducers/edgeReducer'
import {initializeTags} from './reducers/tagReducer'
import Header from './ui/header'
import graph from './graph/cytoscape'
import './styles/App.css'
import ListNodes from './ui/ListNodes'
import StyleEditor from './ui/styleEditor'
import jsonServices from './services/jsonServices'
import Button from '@material-ui/core/Button'
import ListEdges from './ui/ListEdges'
import ListTags from './ui/listTags'
import {setActiveElement} from './reducers/activeElementReducer'
import AddNode from './components/addNode'
//import dispatchTest from './graph/graphHandlers'

//todo split app into smaller components


/*

* tagging of notes, edges
* change of state is possible all the time
* Note / Edges have text fields
LOW PRIORITY: * https everything (edited) 
* at startup - display no graph, what for selection */



const App = (props) => {
 

  const [cy, setCy] = useState('')
  const [id, setId] = useState('0')
  const [graphNames, setGraphNames] = useState([])
  const [currName, setCurrName] = useState('new')
  const [initHandler, setInitHandler] = useState(true)

  const startFunction = (graph) => {
    props.initCy(graph)
    props.initializeJson()
    if(props.graph){
      //cy.json() is cytoscape method which returns the graph configuration in json
      //cy.json(props.graph) method configures graph with the json'
      //Maps graph names to a list from the db to be read by the select component
      updateGraphNames()
    }
  }

  useEffect(() => {
    //initialize cytoscape graph and set it to attribute cy
  
    let cygraph = graph()
    setCy(cygraph) 
    startFunction(cygraph)
  
  // eslint-disable-next-line react-hooks/exhaustive-deps, useEffect gives lint error for startFunction because it can change it values, but because it is run only once the error is pointless.
  },[])

 
  setTimeout(()=> {
    updateGraphNames()
  },1000)

  const updateGraphNames = () => {
    if(props.graph){
      setGraphNames(props.graph.map(j => j = {value: j.id, label : j.name}))  
    }
  }

  const handlers = () => {
    cy.on('select', (event) => {
      props.setActiveElement(event.target)
      console.log(event.target)
        event.target.style({"border-color": "purple", "border-style" : "solid", "border-width" : "8px" })
    })
    cy.on('unselect', (event) => {
      props.setActiveElement('')
        event.target.style({"border-color" : 'black', "border-style" : "solid", "border-width" : "2px"})
    })
  }

  const initHandlers = () => {
    if (cy){
      cy.on('resize', (event) => {
        updateElements()
      })
    handlers()
    setInitHandler(false)
    }else{
      return
    }
  }

  if(initHandler){
    initHandlers()
  }

 const updateElements = () => {
    props.initializeEdges(cy.edges())
    props.initializeNodes(cy.nodes())
    props.initializeTags(cy.nodes().map(n => n.data('tag')))
  
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
    setInitHandler(true)
    cy.nodes().forEach(e => e.style({backgroundColor: e.data('background-color')}))
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
    let cygraph
    if(id !== '0'|| typeof newId === typeof id){
      let id = newId
      cygraph = props.graph.filter(j => j.id === id)
      console.log(cygraph[0].json)
      console.log('here')
      cy.json(cygraph[0].json)
    }
    updateElements()
    //dispatchTest()
  }

 


  const newGraph = () => {
    let newName = window.prompt("New Graph Name:")
    if(props.graph.map(g => g.name).includes(newName)){
      window.alert(`graph ${newName} exists already`)
    }else{
      setCurrName(newName)
      clearElements()
      cy.nodes().remove()
      setInitHandler(true)
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
            <hr></hr>
            Filter Tag
            <ListTags/>
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
         <AddNode cy={cy} update = {updateElements}/>

         
        </div>
          <div>
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
  initializeTags,
  setActiveElement,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
