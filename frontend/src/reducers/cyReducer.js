const cyReducer = (state = "", action) => {
    switch(action.type){
        case "INITCY":
            return action.data
        default:
            return state
    }
}

export const initCy = (cy) => {
    return {
        type: "INITCY",
        data: cy
    }
}

export default cyReducer