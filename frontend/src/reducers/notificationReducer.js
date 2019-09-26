const SETNOTIF = "SETNOTIF"
const CLEARNOTIF = "CLEARNOTIF"

const notificationReducer = (state = {}, action) => {
    switch(action.type){
        case SETNOTIF:
            return action.data
        case CLEARNOTIF:
            return action.data
        default:
             return state
    }
}

export const setNotification = (notification) => {
    return {
        type: SETNOTIF,
        data: notification
    }
}

export const clearNotification = () => {
    return {
        type: CLEARNOTIF,
        data: '',
    }
} 

export default notificationReducer