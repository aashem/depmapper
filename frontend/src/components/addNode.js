import React from 'react'
import Select from 'react-select'
import Button from '@material-ui/core/Button'
import {shapeList, colorList} from '../graph/nodeStyles'

const AddNode = (props) => {
    const shapes = shapeList()
    const colors = colorList()
    let cy = props.cy
    let updateElements = props.update

    const addNode = (event) => {
        event.preventDefault()
        let id = cy.nodes().size()
     
          const createId = () => {
            id = id + 1
            return id
          }
    
          id = createId()
        while(cy.nodes().map(n => n.id()).includes(id.toString())){
         id = createId()
        }
     
        let added = cy.add({
          data: { id: `${id}` , name: `${id}` },
          position: {
            x:200,
            y:200,
          },
        })


        added.addClass('1')
        //refactor
        //create new stylesheet for each node so properties are saved into the json
        cy.style().selector('node#' + added.id())
        .style({'background-color' : `${event.target.color.value}` || 'black', 'shape' : `${event.target.shape.value}` || 'ellipse', 'border-style' : 'solid', 'border-width' : '2px'})
        .update()

        updateElements()
    }

    return(
        <div>
        <form onSubmit = {addNode}>
        <Button type= 'submit'>Add Node</Button>
        
          <Select
            placeholder = 'ellipse'
            className = 'AddNodePanelLeftSelect'
            name = "shape"
            options = {shapes}
          >

          </Select>
          <Select
            placeholder = 'black'
            className = 'AddNodePanelLeftSelect'
            name= "color"
            options = {colors}
          ></Select>
           </form>
          </div>
    )
} 

export default AddNode