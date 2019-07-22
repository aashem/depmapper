const INITTAGS = 'INITTAGS'

const tagReducer = (state = {}, action) => {
    switch(action.type){
        case INITTAGS:
            return action.data
        default:
            return state
    }
}

export const initializeTags = (tags) => {
    return{
        type: INITTAGS,
        data: tags,
    }
}

export default tagReducer