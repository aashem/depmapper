import React from 'react'
import {connect} from 'react-redux'


const StyleEditor = (props) => {
    let cy = props.cy
    let activeEle = props.activeEle
    console.log(activeEle)

 
    const toHex = (rgb) => {
        let firstFilter = Object.values(rgb).filter(o => o !== undefined)
        let secondFilter = firstFilter.filter(o => o.name === 'background-color')
        let converted = secondFilter[0].value.map(g => g.toString(16))
        converted.unshift('#')
        return converted.join('')
    
    } 

    const changeColor = (event) => {
        if(activeEle){
            cy.style().selector('node#' + activeEle.id()).style({backgroundColor: event.target.value}).update()
            
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