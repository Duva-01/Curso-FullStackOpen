import axios from 'axios';

const baseUrl = 'https://agenda-telefonica-backend-67alr0sri-duva-01.vercel.app/api/persons';

const instance = axios.create({ baseURL: baseUrl });

instance.interceptors.response.use((res) => res.data);

const getAll = () => instance.get();

const create = (data) => instance.post('', data);

const update = (id, data) => instance.put(id.toString(), data);

const destroy = (id) => instance.delete(id.toString());

const personService = { getAll, create, update, destroy };
export default personService;