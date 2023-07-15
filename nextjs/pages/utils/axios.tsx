import axios from 'axios';

function createAxiosInstance() {
  const Axios = axios.create({
    baseURL: 'https://laravel-fnxmbkzfhq-an.a.run.app',
    withCredentials: true,
  });


  return Axios;
}

export default createAxiosInstance;
