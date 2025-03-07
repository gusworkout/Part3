import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const supr = id => {
    return axios.delete(`${baseUrl}/${id}`)
    .then(response => response.data)
    .catch(error =>{
        console.error(`Error deleting person with ${id}`, error)
    })
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  supr: supr
}