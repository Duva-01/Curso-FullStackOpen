import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/users';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    console.log(response)
    return response;
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

const userService = { getAll };

export default userService;
