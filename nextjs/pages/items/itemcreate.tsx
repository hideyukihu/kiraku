import { useState, ChangeEvent } from 'react';
import axios from 'axios';
// import User from '../types/User';
import Head from 'next/head';


export default function ItemCreate() {


  const [item, setItem] = useState('');
  const onChangeItem = (e: ChangeEvent<HTMLInputElement>) => setItem(e.target.value);

  const http = axios.create({
    baseURL: 'http://localhost',
    withCredentials: true,
  });

  const itemcreate = () => {
    http.post('/api/items', { item })
      .then((res) => {
        console.log(res);
      });
  };

  return (

    <>
      <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">アイテム画面</h2>


      <div>
        <label htmlFor="item" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
        <input value={item} onChange={onChangeItem} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
      </div>

      <button onClick={itemcreate} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      
      
    </>
  );
}