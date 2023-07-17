import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/login';

const login = async (credentials) => {
  console.log("Envio peticion de login al backend");
  try {
    let response = await axios.post(baseUrl, credentials);
    console.log("Response:", response);
    return response;
  } catch (error) {
    console.error('Error en la peticion HTTP:', error);
    return null;
  }
};

const loginService = {
  login,
};

export default loginService;