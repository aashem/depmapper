import React from 'react'

const graphHandlers = (cy, initEdges, initNodes) => {

    if(cy){
        cy.on('resize', (event) => {
            console.log("resized")
            initEdges(cy.edges())
            initNodes(cy.nodes())
        })
        return <div></div>
    }else{
        return <div></div>
    }

  

}


export default graphHandlers