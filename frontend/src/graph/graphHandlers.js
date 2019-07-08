
const graphHandlers = (cy, initEdges, initNodes) => {

    if(cy){
        cy.on('resize', (event) => {
            console.log("refreshed")
            initEdges(cy.edges())
            initNodes(cy.nodes())
        })
    }
}


export default graphHandlers