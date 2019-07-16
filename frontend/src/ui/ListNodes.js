import React from 'react'
import {connect} from 'react-redux'

const ListNodes = (props) => {
    //let [show, setShow]  = useState('false')
    let cy = props.cy


    //todo show edges connected to the node when the table element is clicked
    const clickHandler = (event) => {
        cy.nodes().unselect()
        cy.nodes(cy.nodes().filter(n => n.id() === event.target.id)).select()
        let selected = cy.nodes(cy.nodes().filter(n => n.id() === event.target.id))
        console.log(selected)
       // setShow(true)
    } 

      
    
    if (props.nodes[0]){
        let list = props.nodes.map(n => 
             <tr key = {n.id()}> 
            <td onClick={clickHandler}  id = {n.id()}>{n.data('name') +' '+ n.id()}</td>
            </tr> 

            )
        return (<table>
            <tbody>
                <tr>
                    <th>NAME</th>
                </tr>
                 {list}
            </tbody>
            </table>
            )
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