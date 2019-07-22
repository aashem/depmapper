import React from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'

const ListTags = (props) => {


    let cy = props.cy
    let tags = ''

    const selectTagged = (event) => {
        if(event.data === 'No Tag'){
            cy.nodes().style({visibility: 'visible'})
        }else{
        cy.nodes().style({visibility: 'visible'})
        let tagged = cy.collection(cy.nodes().filter(n => n.data('tag') !== event.data))
        tagged.style({visibility : 'hidden'})
        }
    }

    const removeDuplicates = (tags) => {
        return[...new Set(tags)];
    }
    if(cy ){
        tags = cy.nodes().map(n =>  n.data('tag'))
    }
    tags = removeDuplicates(tags)
    tags = tags.map(t => t = {label: t , data: t})
    let empty = {label: 'No Tag', data: 'No Tag'}
    tags.unshift(empty)
    console.log(tags)

    return(<Select
    placeholder = 'Tags'
    options = {tags}  
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