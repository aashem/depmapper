import React, {useState} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import {colorList} from '../graph/nodeStyles'

const StyleEditor = (props) => {
    const [activeNode, setActiveNode] = useState('')
    const [currColor, setCurrColor] = useState('')
    const [selected, setSelected] = useState('')
    const [currWidth, setCurrWidth] = useState('')
    const [currHeight, setCurrHeight] = useState('')
    let colors = colorList()
    let hidden = false
    let cy = props.cy
    if (cy){
        cy.on('select', (event) => {
            setSelected(event.target)
            setActiveNode(event.target.id())
            setCurrColor(event.target.style('background-color'))
            setCurrWidth(event.target.style('width'))
            setCurrHeight(event.target.style('height'))
            console.log(event.target.style('width'))
        })
        cy.on('unselect', (event) => {
            setActiveNode('')
            setCurrColor('')
            setSelected('')
            setCurrHeight('')
            setCurrWidth('')
        })
    }

    const changeColor = (event) => {
        console.log(event)
        if(selected){
            cy.style().selector('node#' + selected.id()).style({backgroundColor: event.value}).update()
            setCurrColor(event.value)
        }
    
    }

    const changeWidth = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        if(selected){
            cy.style().selector('node#' + selected.id()).style({width: event.target.value}).update()
        }
    }

    const changeHeight = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        if(selected){
            cy.style().selector('node#' + selected.id()).style({height: event.target.value}).update()
        }
    }
    
    if (!hidden){
    return (
        <div>
            <hr></hr>
            <p>selected node: {activeNode}</p>
            <Select
            name = "color"
            onChange = {changeColor}
            options={colors}
            value = {currColor}
            placeholder = 'color'
            >    
            </Select>
            <hr></hr>
            <p>size</p>
            x
            <input  onChange = {changeWidth}  style = {{width: '40px'}}></input>
            y
            <input  onChange = {changeHeight} style = {{width: '40px'}}></input>
    
    
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