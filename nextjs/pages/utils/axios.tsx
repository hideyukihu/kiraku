import axios from 'axios';

function createAxiosInstance() {
  const Axios = axios.create({
    baseURL: 'next-fnxmbkzfhq-an.a.run.app/://localhost',
    withCredentials: true,
  });

  Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'next-fnxmbkzfhq-an.a.run.app/';

  return Axios;
}

export default createAxiosInstance;
