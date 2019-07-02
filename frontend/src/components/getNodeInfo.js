const getNodeInfo = (cy) => {
  //maps nodes into readable form 
    return cy.nodes().map(n => 
      n = {
        id: n.id() ,
        name: n.data('name'),
        connectedTo: n.edgesTo(n.outgoers()).map(n => n.data("target")),
        edges: n.edgesTo(n.outgoers()).map(e => e.data('id'))
      
      })
  }

  export default getNodeInfo