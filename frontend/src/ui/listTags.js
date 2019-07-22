import React from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'

const ListTags = (props) => {


    let cy = props.cy
    let tags = ''

    const selectTagged = (event) => {
        let tagged = cy.nodes().filter(n => n.data('tag') === event.data)
        tagged.select()
        
    }

    const removeDuplicates = (tags) => {
        return[...new Set(tags)];
    }
    if(cy ){
        tags = cy.nodes().map(n =>  n.data('tag'))
    }
    tags = removeDuplicates(tags)
    tags = tags.map(t => t = {label: t , data: t})
 
    return(<Select
    placeholder = 'Tags'
    options = {tags}
    onChange = {selectTagged}>
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