import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import jsonReducer from './reducers/jsonReducer'
import nodeReducer from './reducers/nodeReducer'
import edgeReducer from './reducers/edgeReducer';
import cyReducer from './reducers/cyReducer';
import tagReducer from './reducers/tagReducer';

const reducer = combineReducers({
    json: jsonReducer,
    nodes: nodeReducer,
    edges: edgeReducer,
    cy: cyReducer,
    tags: tagReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

store.subscribe(()=> {
    console.log(store.getState())
})

export default store