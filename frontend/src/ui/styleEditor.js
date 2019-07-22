import React, {useState} from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import {colorList} from '../graph/nodeStyles'

const StyleEditor = (props) => {
    const [activeNode, setActiveNode] = useState('')
    const [currColor, setCurrColor] = useState('')
    const [selected, setSelected] = useState('')
    const [hidden, setHidden] = useState(true)
    let colors = colorList()
    let cy = props.cy
    if (cy){
        cy.once('select', (event) => {
            console.log(event.target)
            setHidden(false)
            setSelected(event.target)
            setActiveNode(event.target.id())
            setCurrColor(event.target.style('background-color'))
            event.target.style({"border-color": "purple", "border-style" : "solid", "border-width" : "8px" })
        })
        cy.on('unselect', (event) => {
            setHidden(true)
            setActiveNode('')
            setCurrColor('')
            setSelected('')
   
            event.target.style({"border-color" : 'black', "border-style" : "solid", "border-width" : "2px"})
        })
    }

    const changeColor = (event) => {
        if(selected){
            cy.style().selector('node#' + selected.id()).style({backgroundColor: event.value || event.target.value}).update()
            setCurrColor(event.value)
        }
    
    }

  
    
    if (!hidden){
    return (
        <div>
            <h2>{activeNode}</h2>
            <h3>Color:</h3>
            <input id="color" type="color" onChange={changeColor}/>
            <Select
            name = "color"
            onChange = {changeColor}
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