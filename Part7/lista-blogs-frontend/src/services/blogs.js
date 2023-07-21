import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response;
  } catch (error) {
    console.error('Error getting blogs:', error);
    return [];
  }
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response;
};

const update = async (id, newObject) => {
  console.log("En el servicio la id es: " + id + " y el blog es: " + newObject)
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
    .catch(error => {
      console.error('There was an error!', error);
    });
  return response.data;
};


const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const addComment = async (id, comment) => {
  console.log("Envio el siguiente comentario: " + comment)
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return response.data;
};


const blogService = { getAll, create, update, setToken, remove, addComment};

export default blogService;