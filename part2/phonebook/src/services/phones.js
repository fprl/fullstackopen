import axios from 'axios';
const BASE_URL = 'http://localhost:3001/persons';

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

const phonesService = {getAll, create, deletePerson};
export default phonesService;