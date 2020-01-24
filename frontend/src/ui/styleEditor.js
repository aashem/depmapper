import React from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import {edgeArrowTypes} from '../graph/nodeStyles'



const StyleEditor = (props) => {
    console.log(edgeArrowTypes)
    let edgeArrows = edgeArrowTypes()
    console.log(edgeArrows)
    let activeEle = props.activeEle

 
    const toHex = (rgb) => {
        let firstFilter = Object.values(rgb).filter(o => o !== undefined)
        let secondFilter = firstFilter.filter(o => o.name === 'background-color')
        let converted = secondFilter[0].value.map(g => g.toString(16))
        converted.unshift('#')
        return converted.join('')
    
    } 

    const changeColor = (event) => {

        if(activeEle){
            activeEle.data('background-color' , event.value || event.target.value)
            activeEle.style({backgroundColor : activeEle.data('background-color')})

        }       
    
    }

    const changeName = (event) => {

        if(activeEle){
            activeEle.data('name', event.value || event.target.value)
        }
    }

    const changeDescription = (event) => {
        activeEle.data('desc', event.target.value)
    }

    const changeType = (event) => {
        
        if(activeEle){
            activeEle.data('target-arrow-shape', event.value || event.target.value)
            activeEle.style({targetArrowShape : activeEle.data('target-arrow-shape')})
        }
    }

   
    if (activeEle[0]){
        if(activeEle[0].isEdge()){
            return (
                <div className = 'AddNodePanelRight'>
                    <div className = 'EdgeEditor'>
                        <p>
                            Name : 
                        </p>
                        <textarea
                            maxLength = '24'
                            cols = '8'
                            rows = '1'
                            name = 'text'
                            defaultValue = {activeEle[0].data('name')}
                            onChange = {changeName}
                        >   
                        </textarea>
                        </div>
                        <div className = 'EdgeEditorRight'>
                        <p>
                           Arrow Type :  
                        </p>
                        <Select
                            className = "Select-Inner"
                            options = {edgeArrows}
                            name = 'arrow'
                            onChange = {changeType}
                        >
                        </Select>
                        </div>
                </div>
            )
        }
    return (
    <div  className = 'AddNodePanelRight'>
        <div className = 'NodeEditor'> 
            <p>Name : </p>
            <textarea
                cols = '8'
                rows = '1'
                defaultValue = {activeEle[0].data('name')}
                maxLength =  '24'
                onChange = {changeName}
            >
            </textarea>
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
        return <div className = "HelpText">
                <h2>Help: </h2>
               <p>- Right click to open Context Menu</p>
               <p>- Left click to select nodes & edges</p>
                </div>
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