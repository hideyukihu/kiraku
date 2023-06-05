import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost',
  withCredentials: true,
});

export default Axios;
