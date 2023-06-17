import axios from 'axios';

function createAxiosInstance() {
  const Axios = axios.create({
    baseURL: 'http://localhost',
    withCredentials: true,
  });

  Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';

  return Axios;
}

export default createAxiosInstance;
