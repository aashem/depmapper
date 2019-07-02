import React from 'react'
import {connect} from 'react-redux'

const ListNodes = (props) => {
    
    if (props.nodes[0]){
        let list = props.nodes.map(n => 
            <div key = {n.id}>
            <p>Node:{n.name} || Id: {n.id}</p>
            </div>
            )
        return <div>
            <h2>Nodes</h2>
        {list}
        </div>
    }
    return <div>Loading...</div>
    
}

const mapStateToProps = state => {
    return{
        nodes: state.nodes,
    }
}

const mapDispatchToProps = {

}


export default connect(
mapStateToProps,
mapDispatchToProps
)(ListNodes);