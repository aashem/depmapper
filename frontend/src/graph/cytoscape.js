import cytoscape from 'cytoscape'
import cxtmenu from 'cytoscape-cxtmenu'

const graph = (newCy) => {

    let selectedNodes = []
    if(!newCy){
      cytoscape.use(cxtmenu)
    }
  
      let cy = window.cy = cytoscape({
        container: document.getElementById('cy'),
        autolock: false,
        hideEdgesOnViewport: false,
        minZoom: 1e0,
        maxZoom: 1e1,
            
        style: [ // the stylesheet for the graph
          {
            selector: 'node',
            style: {
              'background-color': 'black',
              'label': 'data(name)',
            }
          },
      
          {
            selector: 'edge',
            style: {
              'curve-style': "bezier",
              'width': 5,
              'line-color': 'yellow',
              'target-arrow-color': 'yellow',
              'target-arrow-shape': 'triangle',
              'label': 'data(name)'
            }
          }
        ],
      
        layout: {
          name: "preset",
        }
        
      })
      cy.cxtmenu({
        selector: "node",
        commands: [
          {
            content:"Remove",
            select: (ele) => {
              cy.remove(ele)
              cy.resize()
            }
          },
          {
            content:"Connect",
            select: (ele) => {
              ele.select()
              ele.lock()
              cy.resize()
            }
          },
          {
            content:"Rename",
            select: (ele) => {
              let name = window.prompt()
              if (name){
              ele.data("name", name)
              cy.resize()
              }       
            }
          },{
            content:"Group",
            select: (ele) => {
              ele.select()
            }
          }
        ],
      })
  
      cy.cxtmenu({
        selector: "edge",
        commands: [
          {
          content:"Remove",
          select: (ele) => {
            cy.remove(ele)
            cy.resize()
          }
          },
          {
          content:"Rename",
          select: (ele) => {
            let name = window.prompt()
            if(name){
                ele.data("name", name)
                cy.resize()
            }
 
          }
        }
      ]
      })
  
      cy.on('tap', (event) => {
        let evtTarget = event.target;
        console.log(selectedNodes)
        if(evtTarget !== cy){

            console.log(evtTarget.id())

          if(selectedNodes.length === 1){

            selectedNodes.push(evtTarget)  

            if(selectedNodes.length > 1){

              let compareId = cy.edges().map(e => e.id())
              let edgeId = `${selectedNodes[0].id()}${selectedNodes[1].id()}`

                if(compareId.includes("e" + edgeId)){

                  window.alert("Connection already exists")
              }else{

                  cy.add({group:"edges", data:{ id: "e"+ selectedNodes[0].id()+selectedNodes[1].id(), source:selectedNodes[0].id(), target:selectedNodes[1].id(), name:"" }})
              }
              selectedNodes = []
          }
        }
        } 
      })
  
      cy.on('lock', (event) => {
        let selected = event.target;
        window.alert("choose target")
        selectedNodes.push(selected)
        selected.unlock()
      } )
      cy.on('select', (event) => {
        let selected = event.target
        selected.animate({
          style:{backgroundColor: "blue"}
        })
        setTimeout(() => {
          selected.animate({
            style:{backgroundColor: "black"}
          })
        }, 1000);
      
    })

    
  
      
  
    return cy
  }

  export default graph 