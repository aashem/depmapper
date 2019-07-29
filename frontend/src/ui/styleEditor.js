import React from 'react'
import {connect} from 'react-redux'


const StyleEditor = (props) => {
    let cy = props.cy
    let activeEle = props.activeEle

 
    const toHex = (rgb) => {
        let values = Object.values(rgb)
        let firstFilter = values.filter(o => o !== undefined)
        let secondFilter = firstFilter.filter(o => o.name === 'background-color')
        let convertable = secondFilter[0].value
        let converted = convertable.map(g => g.toString(16))
        converted.unshift('#')
        let value = [...converted]
        return value.join('')
    
    } 

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
    <div  className = 'AddNodePanelRight'>
        <div className = 'NodeEditor'> 
            <h2>Node{activeEle[0].data('name')} </h2>
            <input id="color" 
            type="color"
            onChange={changeColor}
            defaultValue = {activeEle[0]._private.style ? toHex(activeEle[0]._private.style) : '0000ff'}
             />
        </div>
        <div className = 'NodeDesc'>
            <p>Description</p>
            <textarea
            maxLength = '255'
            cols = '35'
            rows= '5'
            onChange = {changeDescription}
            defaultValue = {activeEle[0] ? activeEle.data('desc') : 'description'}
            name = 'text'
            ></textarea>
        </div>
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