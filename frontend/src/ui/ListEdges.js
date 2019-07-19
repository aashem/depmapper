import React from 'react'
import {connect} from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import {makeStyles} from '@material-ui/core/styles'



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

const ListEdges = (props) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(true)
    let cy = props.cy

    const openList = () => {
        setOpen(!open);
    }
    if (props.edges[0]){

        let list = props.edges.map(e => 
            <ListItem button key = {e.id()} className = {classes.nested}>
                <ListItemText primary = {e.data('name') || e.id()}></ListItemText>
            </ListItem>
            )

        return (
            <List
                component = 'nav'
                className = {classes.root}>
                <ListItem button onClick = {openList}>
                    <ListItemText primary = 'Edges'></ListItemText>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List>
                        {list}
                    </List>
                </Collapse>

            </List>
        )
    }
        return(
            <div>
                <List>
                    <ListItem>
                        <ListItemText primary = 'Edges'></ListItemText>
                    </ListItem>
                </List>
            </div>
        )
}

const mapStateToProps = state => {
    return{
        edges:state.edges,
        cy: state.cy
    }
}

export default connect(
    mapStateToProps
)(ListEdges)