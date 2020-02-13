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
import {SaveGraph, NewGraph, DeleteGraph, RenameGraph, SelectGraph} from './components/graphHelpers'
import Button from '@material-ui/core/Button'
import ListEdges from './ui/ListEdges'
import ListTags from './ui/listTags'
import {setActiveElement} from './reducers/activeElementReducer'
import AddNode from './components/addNode'
import Notification from './ui/notification'
import {setNotification, clearNotification} from './reducers/notificationReducer'

const App = (props) => {
  const [cy, setCy] = useState('')
  const [id, setId] = useState('0')
  const [graphNames, setGraphNames] = useState([])
  const [currName, setCurrName] = useState('new')
  const [initHandler, setInitHandler] = useState(true)
  let notification = ''
    if (notification){
    }
  

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

    let cygraph = graph(null, props.setNotification)
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
        event.target.style({"border-color": "purple", "border-style" : "solid", "border-width" : "8px" })
        if(!event.target.data('processing')){
        props.setNotification(notification = {msg : `selected ${event.target.data('name')}`, type: "help"})
        event.target.data('processing', 'yes')
        console.log(event.target.data())
        }
        if(event.target.isEdge()){
          event.target.style({"line-color" : "purple"})
        }
    })
    cy.on('unselect', (event) => {
      props.setActiveElement('')
        event.target.style({"border-color" : 'black', "border-style" : "solid", "border-width" : "2px"})
        if(event.target.isEdge()){
          event.target.style({"line-color" : "black"})
        }
        event.target.data('processing', '')
        props.clearNotification()
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

  const load = (target) => {
    cy.json(target)
  }
  
  const loadGraph = (newId) => {
    props.initializeJson()
    if(typeof newId !== typeof id){
      let target = props.graph.filter(j => j.id === id)
      if(target.length > 0){
        console.log('Load Succesful')
        load(target[0].json)
      }else{
        console.log('Load Unsuccesful (no target graph)')
      }
    }else{
      let target = props.graph
      if(id !== '0'|| typeof newId === typeof id){
        let id = newId
        target = props.graph.filter(j => j.id === id)
        load(target[0].json)
      }
    }
    updateElements()
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
      <div className = "TopBar">
      <div className = "UpperButtons">
        <NewGraph stateGraph = {props.graph} cy = {cy} setCurrName = {setCurrName} clearElements = {clearElements} setInitHandler = {setInitHandler}/>
        <DeleteGraph cy = {cy} initGraph = {graph} setCurrName = {setCurrName} setCy = {setCy} clearElements = {clearElements} removeGraphId = {props.removeGraphId} id = {id}/>
        <RenameGraph cy = {cy} id = {id} removeGraphId = {props.removeGraphId} setCurrName = {setCurrName} postJson = {props.postJson}/>
      </div>
      <div className= "Panel">
          <SaveGraph cy= {cy} currName = {currName} propsGraph = {props.graph} postJson = {props.postJson} updateJson = {props.updateJson}/>
          <Button onClick = {loadGraph}>load</Button>
        </div> 
      </div>
    <div className="Cy"id = 'cy'>
      <div>
      <Notification></Notification>     
      </div>
    </div>
      <div className = 'AddNodePanel'>
        <div className = 'AddNodePanelLeft'>
         <AddNode cy={props.cy} update = {updateElements}/>
        </div>
            <StyleEditor/>
      </div>
          
    </div>
    </div>
  </div>

  )

    

}
const mapStateToProps = state => {
  return{
    graph: state.json,
    cy: state.cy,

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
  setNotification,
  clearNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
