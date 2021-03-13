import axios from 'axios';
const BASE_URL = '/api/persons';

const getAll = () => {
  const request = axios.get(BASE_URL);
  return request.then(response => response.data)
};

const create = newObject => {
  const request = axios.post(BASE_URL, newObject);
  return request.then(response => response.data)
};

const deletePerson = id => {
  const request = axios.delete(`${BASE_URL}/${id}`)
  return request;
};

const updatePerson = (id, updatedObject) => {
  const request = axios.put(`${BASE_URL}/${id}`, updatedObject)
  return request.then(response => response.data);
}

const phonesService = {getAll, create, deletePerson, updatePerson};
export default phonesService;