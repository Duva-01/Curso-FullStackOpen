import axios from 'axios';

const instance = axios.create({ baseURL: '//localhost:3001/persons' });

instance.interceptors.response.use((res) => res.data);

const getAll = () => instance.get();

const create = (data) => instance.post('', data);

const update = (id, data) => instance.put(id.toString(), data);

const destroy = (id) => instance.delete(id.toString());

const personService = { getAll, create, update, destroy };
export default personService;