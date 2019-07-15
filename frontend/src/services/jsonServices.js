import Axios from 'axios'


//PORT
const url = "http://localhost:3001/api/graphs"

const getAll = async () => {
    const response = await Axios.get(url)
    return response.data
}

const create = async (content) => {
    const response = await Axios.post(url, content)
    return response.data
}   

const update = async (id, content) => {
    const response = await Axios.put(url+`/${id}`, content)
    return response.data
}

const getById = async (id) => {
    const response = await Axios.get(url+`/${id}`)
    return response.data
}

const remove = async (id) => {
    const response = await Axios.delete(url+`/${id}`)
    return response.data
}

export default {getAll, create, update, getById, remove}
