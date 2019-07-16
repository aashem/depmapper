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
    const [hidden, setHidden] = useState(true)
    let colors = colorList()
    let cy = props.cy
    if (cy){
        cy.once('select', (event) => {
            setHidden(false)
            setSelected(event.target)
            setActiveNode(event.target.id())
            setCurrColor(event.target.style('background-color'))
            setCurrWidth(event.target.style('width'))
            setCurrHeight(event.target.style('height'))
            event.target.style({"border-color": "purple", "border-style" : "solid", "border-width" : "8px" })
        })
        cy.on('unselect', (event) => {
            setHidden(true)
            setActiveNode('')
            setCurrColor('')
            setSelected('')
            setCurrHeight('')
            setCurrWidth('')
            event.target.style({"border-color" : 'black', "border-style" : "solid", "border-width" : "2px"})
        })
    }

    const changeColor = (event) => {
        if(selected){
            cy.style().selector('node#' + selected.id()).style({backgroundColor: event.value}).update()
            setCurrColor(event.value)
        }
    
    }

    const changeWidth = (event) => {
        let width = parseInt(event.target.value)
        event.preventDefault()
        if(selected && (width >= 30 && width <= 100)){
            cy.style().selector('node#' + selected.id()).style({width: width}).update()
        }
    }

    const changeHeight = (event) => {
        let height = parseInt(event.target.value)
        event.preventDefault()
        if(selected && ( height <= 100 && height >= 30)){
            cy.style().selector('node#' + selected.id()).style({height: height}).update()
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
            <input type= 'number' onChange = {changeWidth} min = '30' max = '100' defaultValue = {30} style = {{width: '40px'}}></input>
            y
            <input type = 'number' onChange = {changeHeight} min = '30' max = '100' defaultValue = {30} style = {{width: '40px'}}></input>
    
    
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