import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
// const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => 
    response.data
    )
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(
    response => {
    console.log(response)
    return response.data
    }
    )
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBloglistInfo = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}


export default { 
  getAll, 
  create, 
  update,
  deleteBloglistInfo,
  setToken
}

