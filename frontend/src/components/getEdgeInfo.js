const getEdgeInfo = (cy) => {
    return cy.edges().map(e =>
        e = {
            id: e.id(),
            connectedTo: e.connectedNodes().map(n => n.data("id"))
        })

}

export default getEdgeInfo