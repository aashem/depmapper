import React from 'react'
import {Input} from "@material-ui/core"

export const JsonFileReader = (props) => {
    let fileReader
    let cy = props.cy

    const handleFileRead = (e) => {
        let content = fileReader.result
        let jsonFromFile = JSON.parse(content)
        console.log(jsonFromFile)
        createFromJSON(jsonFromFile)
      }
    
      const handleFileChosen = (file) => {
        fileReader = new FileReader()
        fileReader.readAsText(file)
        fileReader.onloadend = () => {
          handleFileRead()
        }
      }
    
      const createFromJSON = (json) => {
        cy.json(json)
    
      }    

    return (
        <Input type='file' id='file' onChange={e => handleFileChosen(e.target.files[0])}>Upload Json</Input>
    )

}



