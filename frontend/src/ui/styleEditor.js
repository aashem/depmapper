import React from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import {colorList} from '../graph/nodeStyles'

const StyleEditor = (props) => {
    let colors = colorList()
    let cy = props.cy
    let activeEle = props.activeEle

 


    const changeColor = (event) => {
        if(activeEle){
            cy.style().selector('node#' + activeEle.id()).style({backgroundColor: event.value || event.target.value}).update()
        }
    
    }

    const changeDescription = (event) => {
        activeEle.data('desc', event.target.value)
    }

   
   
    if (activeEle[0]){
    return (
        <div>
            <h2>Selcted Node: {activeEle[0].data('name')} </h2>
            <input id="color" type="color" onChange={changeColor}/>
            <textarea
            maxLength = '255'
            cols = '30'
            rows= '3'
            onChange = {changeDescription}
            defaultValue = {activeEle[0] ? activeEle.data('desc') : 'description'}
            name = 'text'
            ></textarea>
            <Select
            name = "color"
            onChange = {changeColor}
            options={colors}
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
        cy: state.cy,
        activeEle: state.activeElement
    }
}

export default connect(
    mapStateToProps
)(StyleEditor)