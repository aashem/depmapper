import React,{useEffect, useState} from 'react';
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
import {SaveGraph, NewGraph, DeleteGraph, RenameGraph} from './components/graphHelpers'
import Button from '@material-ui/core/Button'
import ListEdges from './ui/ListEdges'
import ListTags from './ui/listTags'
import {setActiveElement} from './reducers/activeElementReducer'
import AddNode from './components/addNode'
import SelectGraph from './components/selectGraph'
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
  
  return (
    
  <div className = "Header" >
    <Header currName = {currName}></Header>
      <div className = 'Wrapper'>
        <div className = "LeftPanel">  
            <h3 className = "GraphName">Graph: {currName} </h3>
              <SelectGraph graphs = {graphNames} cy = {cy} update = {updateElements} setId = {setId}  setCurrName = {setCurrName}
                loadGraph = {loadGraph}
                setInitHandler = {setInitHandler}
                graphDispatch = {props.graph}
                />
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
        <NewGraph stateGraph = {props.graph} cy = {cy} setCurrName = {setCurrName} clearElements = {clearElements} setInitHandler = {setInitHandler}/>
        <DeleteGraph cy = {cy} initGraph = {graph} setCurrName = {setCurrName} setCy = {setCy} clearElements = {clearElements} removeGraphId = {props.removeGraphId} id = {id}/>
        <RenameGraph cy = {cy} id = {id} removeGraphId = {props.removeGraphId} setCurrName = {setCurrName} postJson = {props.postJson}/>
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
          <SaveGraph cy= {cy} currName = {currName} propsGraph = {props.graph} postJson = {props.postJson} updateJson = {props.updateJson}/>
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
