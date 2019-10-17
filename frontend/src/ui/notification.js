import React from 'react'
import {connect} from 'react-redux'
import '../styles/Notification.css'

const Notification = props => {
    let msg = props.notif.msg
    let type = props.notif.type
    console.log(type)
    

    if (msg) {
        return (
            <p className = "Notification">{msg}</p>
            )
   }else{
       return null
   }
}

const mapStateToProps = state => {
    return {
        notif: state.notification,
    }
}


export default connect(
mapStateToProps,
)(Notification) 