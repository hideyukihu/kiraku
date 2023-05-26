import React, { useState } from 'react';
import axios from './libs/axios';




export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  interface User {
    email: string;
    name: string;
  }



  const login = () => {
    axios.get('/sanctum/csrf-cookie').then((res) => {
      axios.post('/api/login', { email, password }).then((res) => {
        console.log(res);
      })
    })
  };



  const logout = () => {
    axios.post('/api/logout').then((res) => {
      console.log(res);
    })
  };


  const getUsers = () => {
    axios.get<User[]>('http://localhost/api/users').then((res) => {
      setUsers(res.data);
    });
  };
  const reset = () => setUsers([]);
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);




  return (
    <div className="App">
      <nav>
        <button onClick={login} className='rounded-full ...'>ログイン</button>
        <button onClick={logout}>ログアウト</button>
        <button onClick={getUsers}>User 一覧</button>
        <button onClick={reset}>リセット</button>
      </nav>
      <br />
      <div>
        <label>email</label>
        <input type="text" value={email} onChange={onChangeEmail} />
        <label>password</label>
        <input type="password" value={password} onChange={onChangePassword} />
      </div>
      <div>
        {users.map((user) => {
          return <p key={user.email}>{user.name}</p>;
        })}
      </div>
    </div>
  );
}

