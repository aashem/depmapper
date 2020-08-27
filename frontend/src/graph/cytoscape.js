import cytoscape from 'cytoscape'
import cxtmenu from 'cytoscape-cxtmenu'

const graph = (newCy, setNotification) => {
    let isGroup = false
    let selectedNodes = []
    let groupingList = []
    let counter = 1
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
            data: 'tag',
            style: {
              'label': 'data(name)',
            }
          },
      
          {
            selector: 'edge',
            style: {
              'curve-style': "bezier",
              'width': 5,
              'line-color': 'black',
              'target-arrow-color': 'black',
              'target-arrow-shape': 'triangle',
              'label': 'data(name)'
            }
          }
        ],
      
        layout: {
          name: "preset",
        }
        
      })
      let notification = ""
      console.log(notification)
      cy.cxtmenu({
        selector: "node",
        commands: [
          {
            content:"Tag",
            select: (ele) => {
              if(!ele.data('tag')){
                console.log("No tag creating empty list")
                let emptyList = []
                ele.data('tag', emptyList)
              }
              let tagList = ele.data('tag')
              let newTag = window.prompt('Tag name')
              if (tagList.includes(newTag)){
                window.alert('Duplicate Tag')
              }else{
                tagList.push(newTag)
                let newTagList = tagList
                ele.data('tag', newTagList)
                cy.resize()
              }
              }
     
          },
          {
            content:"Remove",
            select: (ele) => {
              cy.remove(ele)
              setNotification(notification = {msg: `Removed ${ele.id()}`, type: "temp"})
              cy.resize()
            }

          },
          {
            content:"Connect",
            select: (ele) => {
              setNotification(notification = {msg : "Select target to connect with", type: "connect"})
              ele.data('processing' , 'true')
              ele.select()
              ele.lock()
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
              setNotification(notification = {msg : "Select parent node", type: "connect"})
              ele.data('processing', 'true')
              isGroup = true
              ele.lock()
              groupingList.push(ele)
              cy.resize()
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
            setNotification(notification = {msg : `removed ${ele.id()}`, type: "temp"})
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

      cy.cxtmenu({
        selector: 'core',
        commands: [
          {
          content: "Add Node",
          select: (ele) => {
            let id = cy.nodes().size() + counter
            counter = counter + 1
            cy.add({
              data: { id: `${id + 1}` , name: `${id + 1}` },
              position: {
                x: 400,
                y: 400,
              },
            })
          }
          }
        ]
      })

      //todo refactor all eventhandlers to fix bugs and usability issues 
      const addMultipleEdges = (nodes, target, compareId) => {
        nodes.forEach( node => {
          if(compareId.includes('e' + node.id()+ target.id())){
            console.log('skipped creating edge ' + node.id() + target.id())
          }else{
            cy.add({group:"edges", data:{ id: "e"+ node.data('id')+ target.data('id'), source:node.data('id'), target:target.data('id'), name:`` }})
          }  
        })
      }

      const groupMultipleNodes = (nodes, target) => {
        nodes.forEach ( node => {
          node.move({parent : target.id()})
        })
      }

  
      cy.on('tap', (event) => {
        let evtTarget = event.target;
        let nodes = cy.filter('node')
        nodes = nodes.filter(node => node.data('processing') === 'yes')
       
        if(evtTarget !== cy){
          if(groupingList.length >= 1){
            groupingList[0].move({parent: evtTarget.id()})
            if(nodes.length > 0){
              groupMultipleNodes(nodes, evtTarget)
            }
            groupingList = []
          }
          if(selectedNodes.length === 1){

            selectedNodes.push(evtTarget)  

            if(selectedNodes.length > 1){
              

              let compareId = cy.edges().map(e => e.id())
              let edgeId = `${selectedNodes[0].id()}${selectedNodes[1].id()}`
              if(nodes.length > 0){
                addMultipleEdges(nodes,evtTarget, compareId)
              }

                if(compareId.includes("e" + edgeId)){

                  window.alert("Connection already exists")
              }else{
                
                  cy.add({group:"edges", data:{ id: "e"+ selectedNodes[0].id()+selectedNodes[1].id(), source:selectedNodes[0].id(), target:selectedNodes[1].id(), name:`` }}) 
              }
              selectedNodes = []
              cy.resize()
             
          }
        }
        } 
      })
  
      cy.on('lock', (event) => {
        let selected = event.target;

        if (selectedNodes.length > 0){
          selectedNodes = []
        }

        if(isGroup){
          isGroup = false
          selected.unlock()
          selected.unselect()
        }else{
          selectedNodes.push(selected)
          selected.unlock()
        }
  
      } )

        
  
    return cy
  }

  export default graph 