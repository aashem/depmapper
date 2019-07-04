import React from 'react'
import {connect} from 'react-redux'

const ListNodes = (props) => {
    
    if (props.nodes[0]){
        let list = props.nodes.map(n => 
             <tr key = {n.id()}> 
            <td>{n.data('name') +' '+ n.id()}</td>
         
            </tr> 
            )
        return <table>
            <tbody>
                <tr>
                    <th>NAME</th>
                    <th>ID</th>
                </tr>
                 {list}
            </tbody>
        </table>
    }
    return <div>Select Graph</div>
    
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