const nodeReducer = (state = {}, action) => {
    switch(action.type){
        case "INITNODES":
            return action.data
        default:
            return state
    }
}

export const initializeNodes = (nodes) => {
    return{
        type:"INITNODES",
        data: nodes
    }
}


export default nodeReducer