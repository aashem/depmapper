import React from 'react'
import Select from 'react-select'

const SelectGraph = (props) => {
    let graph = props.graphDispatch
    let graphNames = props.graphs
    let cy = props.cy
    let updateElements = props.update
    let setId = props.setId
    let setCurrName = props.setCurrName
    let loadGraph = props.loadGraph
    let setInitHandler = props.setInitHandler

    const selectGraph = value => {
        cy.nodes().unselect()
        cy.nodes().remove()
        let newId = value.value
        setId(newId)
        let name = graph.filter(j => j.id === newId)
        setCurrName(name[0].name)
        loadGraph(newId)
        updateElements()
        setInitHandler(true)
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

export default SelectGraph