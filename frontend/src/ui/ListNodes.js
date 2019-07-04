import React from 'react'
import {connect} from 'react-redux'

const ListNodes = (props) => {
    let cy = props.cy

    const clickHandler = (event) => {
        cy.nodes(cy.nodes().filter(n => n.id() === event.target.id)).select()
        let selected = cy.nodes(cy.nodes().filter(n => n.id() === event.target.id))
        console.log(selected)
        setTimeout(()=> {
            cy.nodes().unselect()
        },500)
    } 
    
    if (props.nodes[0]){
        let list = props.nodes.map(n => 
             <tr key = {n.id()}> 
            <td onClick={clickHandler} id = {n.id()}>{n.data('name') +' '+ n.id()}</td>
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
        cy: state.cy,
        nodes: state.nodes,
    }
}

const mapDispatchToProps = {

}


export default connect(
mapStateToProps,
mapDispatchToProps
)(ListNodes);