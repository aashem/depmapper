import React, {useState} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import {colorList} from '../graph/nodeStyles'

const StyleEditor = (props) => {
    const [activeNode, setActiveNode] = useState('')
    const [currColor, setCurrColor] = useState('')
    const [selected, setSelected] = useState('')
    let colors = colorList()
    let hidden = false
    let cy = props.cy
    console.log(cy)
    if (cy){
        cy.on('select', (event) => {
            setSelected(event.target)
            setActiveNode(event.target.id())
            setCurrColor(event.target.style('background-color'))
        })
        cy.on('unselect', (event) => {
            setActiveNode('')
            setCurrColor('')
            setSelected('')
        })
    }

    const changeStyle = (event) => {
        if(selected){
            cy.style().selector('node#' + selected.id()).style({backgroundColor: event.value}).update()
            setCurrColor(event.value)
        }
    
    }
    
    if (!hidden){
    return (
        <div>
            <hr></hr>
            <p>selected node: {activeNode}</p>
            <Select
            name = "color"
            onChange = {changeStyle}
            options={colors}
            value = {currColor}
            placeholder = 'color'
            >    
            </Select>
    
        </div>
    )
    }else{
        return <></>
    }
}

const mapStateToProps = state => {
    return {
        cy: state.cy
    }
}

export default connect(
    mapStateToProps
)(StyleEditor)