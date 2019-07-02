import jsonServices from '../services/jsonServices'



const jsonReducer = (state = null, action) =>{
    switch(action.type){
    case 'INIT':
        return action.data
    case 'POST':
        return [...state, action.data]
    case 'UPDATE':
        return action.data
    case 'INITID':
        return action.data
    case 'DELETEID':
        return action.data
    default:
        return state
    }



}
export const initializeJson = () => {
    return async dispatch => {
        let json = await jsonServices.getAll()
        dispatch({
            type: 'INIT',
            data: json,
        })
    }
}

export const postJson = (content) => {
    return async dispatch => {
        await jsonServices.create(content)
        let json = await jsonServices.getAll()
        dispatch({
            type:'POST',
            data: json,
        })
    }
}

export const updateJson = (id, content) => {
    return async dispatch => {
        await jsonServices.update(id, content)
        let json = await jsonServices.getAll()
        dispatch({
            type:'UPDATE',
            data: json,
        })
    }
}

export const initJsonId = (id) => {
    return async dispatch => {
        let json = await jsonServices.getById(id)
        dispatch({
            type:'INITID',
            data:json,
        })
    }
}

export const removeGraphId = (id) => {
    return async dispatch => {
        await jsonServices.remove(id)
        let json = await jsonServices.getAll()
        dispatch({
            type:'DELETEID',
            data: json,
        })
    }
}
 
export default jsonReducer