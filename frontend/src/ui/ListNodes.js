import React from 'react'
import {connect} from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import {makeStyles} from '@material-ui/core/styles'
import Delete from '@material-ui/icons/Delete'
import Create from '@material-ui/icons/Create'
import IconButton from '@material-ui/core/IconButton'
import {itemStyle} from './styles/itemStyle'


const useStyles = makeStyles(theme => ({
    root : {
        padding: '0',
        width: '100%',
        maxWidth : 300,
    },
    nested : {
        paddingLeft: theme.spacing(4),
    }
})) 

const ListNodes = (props) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    let cy = props.cy

    const openList = () => {
        setOpen(!open);
    }

   
    const clickHandler = (event) => {
        cy.nodes().unselect()
        cy.nodes(cy.nodes().filter(n => n.id() === event.currentTarget.id)).select()
    }       
    
    const deleteNode = (event) => {
        cy.nodes().unselect()
        cy.nodes(cy.nodes().filter(n => n.id() === event.currentTarget.id)).remove()
        cy.resize()
    }

   

  

    if (props.nodes[0]){
        let list = props.nodes.map(n => 
            <ListItem  key = {n.id()}  className = {classes.nested} style = {itemStyle}>
                <ListItemText  primary = {n.data('name') || n.id()}></ListItemText>
                <IconButton onClick = {clickHandler} id = {n.id()}> 
                    <Create></Create>
                </IconButton>
                <IconButton onClick = {deleteNode} id = {n.id()}>
                    <Delete></Delete>
                </IconButton>
            </ListItem>

            )
        return (
        <List component ='nav'
            className = {classes.root}
        >
            <ListItem button onClick = {openList}>
                <ListItemText primary = 'Nodes'></ListItemText>
                {open ?  <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit >
                    <List component='div'>
                       {list} 
                    </List>
                </Collapse>
        </List>
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