import React from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'

const ListTags = (props) => {

    let filteredTags = []
    let cy = props.cy
    let tags = ''

    const selectTagged = (event) => {
        if(event.data === 'No Tag'){
            cy.elements().style({visibility: 'visible'})
        }else{
            cy.elements().style({visibility: 'visible'})
            let unTagged = cy.collection(cy.nodes().filter(n => !n.data('tag').includes(event.data) && n.isChildless() === true))
            let tagged = cy.collection(cy.nodes().filter(n => n.data('tag').includes(event.data)))
            let subGraphEdgeIds = tagged.map(t => t.edgesTo(tagged).id())
            let hiddenEdges = cy.edges().filter(e => !subGraphEdgeIds.includes(e.data('id')))
            hiddenEdges.style({visibility : 'hidden'})
            unTagged.style({visibility: 'hidden'})
            tagged.children().style({visibility: 'visible'})
        
        }
    }   

    const removeDuplicates = (tags) => {
        if(tags){
            tags = tags.filter(t => t !== undefined)
        }
        return[...new Set(tags)];
    }

    if(cy){
        tags = cy.nodes().map(n => n.data('tag'))
        if(tags){
            let tagList = tags.flat()
            tagList.forEach(t => {
                if (filteredTags.includes(t))
                return 
                else filteredTags.push(t)
                return
            } )
        }
    }
    tags = removeDuplicates(tags)
    tags = tags.map(t => t = {label: t , data: t})
    filteredTags = filteredTags.map(t => t = {label : t, data : t})
    let empty = {label: 'No Tag', data: 'No Tag'}
    filteredTags.unshift(empty)
    tags.unshift(empty)
 

    return(<Select
    placeholder = 'Tags'
    options = {filteredTags}  
    onChange = {selectTagged}
    defaultValue = {tags[0]}>
    </Select>)
}

const mapStateToProps = state => {
    return{
        cy: state.cy,
        tags: state.tags,
    }
}

export default connect(
mapStateToProps,
)(ListTags);