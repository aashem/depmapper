const SETACTIVE = 'SETACTIVE'

const activeElementReducer = (state = {} , action) => {
    switch (action.type){
        case SETACTIVE:
            return action.data
        default:
            return state
    }
} 

export const setActiveElement = (element) => {
    return{
        data: element,
        type: SETACTIVE
    }
}

export default activeElementReducer