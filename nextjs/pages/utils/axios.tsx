import axios from 'axios';

function createAxiosInstance() {
  const Axios = axios.create({
    baseURL: 'http://localhost',
    withCredentials: true,
  });

  return Axios;
}

export default createAxiosInstance;
