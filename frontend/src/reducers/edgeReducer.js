const edgeReducer = (state = {}, action) => {
    switch(action.type){
        case "INITEDGES":
            return action.data
        default:
            return state
    }
}

export const initializeEdges = (edges) => {
    return{
        type:"INITEDGES",
        data: edges
    }
}

export default edgeReducer