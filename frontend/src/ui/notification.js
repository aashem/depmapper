import React from 'react'
import {connect} from 'react-redux'
import '../styles/Notification.css'

const Notification = props => {
    const [visible, setVisible] = React.useState(true)
    let msg = props.notif.msg
    let type = props.notif.type
    let time = props.notif.time
    console.log(msg)
    if (time) {
        setTimeout(()=>{
            setVisible(false)
        })
    }
    if (msg && visible) {
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