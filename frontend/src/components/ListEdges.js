import React from 'react'
import {connect} from 'react-redux'

const ListEdges = (props) => {
    if(props.edges[0]){
        let list = props.edges.map(e => e.id + ",")
        console.log(list)
        return(
        <div>
            <h2>Edges</h2>
            <p>{list}</p>
        </div>)
    }else{

        return(
            <div>
                Loading...
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        edges: state.edges
    }
}

export default connect(
    mapStateToProps
)(ListEdges)