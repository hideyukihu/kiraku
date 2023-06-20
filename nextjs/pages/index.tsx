import { useState, ChangeEvent,  } from 'react';
import { User } from './types/User'; 
import { useRouter } from 'next/router';

import Link from 'next/link';

import createAxiosInstance from './utils/axios';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();


  const Axios = createAxiosInstance();


  const login = () => {
    Axios.get('/sanctum/csrf-cookie')
      .then((res) => {
        Axios.post('/api/login', { email, password })
          .then((res) => {
            console.log(res); 
            router.push('/items/list');
          })
          .catch((error) => {
            console.error(error);
            // 認証失敗時に現在の画面に戻る
            router.push('/');
          });
      })
      .catch((error) => {
        console.error(error);
        // 認証失敗時に現在の画面に戻る
        router.push('/');
      });
  };
  const logout = () => {
    Axios.post('/api/logout').then((res) => {
      console.log(res);
    })
  };
  const getUsers = () => {
    Axios.get('http://localhost/api/users').then((res: any
    ) => {
      setUsers(res.data);
    });
  };
  const reset = () => { setUsers([]); };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className="App">
      <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white text-center">ログイン画面</h2>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
        <input type="text" value={email} onChange={onChangeEmail}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
        <input type="password" value={password} onChange={onChangePassword} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      </div>

      <nav className='my-5'>
        <button onClick={login}className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2 mr-2">ログイン</button>
        <button onClick={logout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2">ログアウト</button>
        <Link href="/users/usercreate" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block">ユーザー登録</Link>
      </nav>
      <div>
        {
          users.map((user) => {
            return (
              <p key={user.email}>{user.name}</p>
            );
          })
        }
      </div>
    </div>
  );
}

export default Login;
