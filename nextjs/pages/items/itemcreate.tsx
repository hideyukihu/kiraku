import { useState, ChangeEvent, useEffect, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactPortal } from 'react';
// import User from '../types/User';
import Head from 'next/head';
import Link from 'next/link';
import { Axios } from '../utils/axios';


export default function NameCreate() {


  const [name, setName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [category, setCategory] = useState([]);
  const [item, setItem] = useState([]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => setSelectedCategoryId(e.target.value);

  useEffect(() => {
    categoryindex();
  }, []);

  useEffect(() => {
    fetchItem();
  }, []);

  const itemcreate = () => {
    Axios.post('/api/items', { name, category_id: selectedCategoryId })
      .then((res) => {
        console.log(res);
        Axios.get('/api/items')
        .then((res) => {
          console.log(res.data);
          setItem(res.data);
        });
      });
  };


  const categoryindex = () => {
    Axios.get('/api/categories')
      .then((res) => {
        console.log(res.data);
        setCategory(res.data);
      });
  };

  const fetchItem = () => {
    Axios.get('/api/items')
      .then((res) => {
        console.log(res.data);
        setItem(res.data);
      });
  };

  return (

    <>
      <h2 className="mb-2 mt-0 text-4xl font-extrabold leading-tight text-primary">
        買い物リスト登録
      </h2>


      <div>
        <label htmlFor="category_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">カテゴリー</label>
        <div>
          <select value={selectedCategoryId} onChange={onChangeCategory} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">カテゴリーを選択してください</option>
            {category.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="item" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">品名</label>
        <input value={name} onChange={onChangeName} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
      </div>




      <button onClick={itemcreate} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-2">登録</button>
      <Link href="/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2">ログイン画面へ</Link>

      <h2 className="mb-2 mt-0 text-4xl font-medium leading-tight text-primary">
        
      </h2>


      <h2 className="mb-2 mt-0 text-4xl font-extrabold leading-tight text-primary">
        買い物リスト
      </h2>
      {item.map((item) => (
        item.ispurchase === 0 && (
          <div key={item.id}>
            <p>{item.name}</p  >
          </div>
        )
      ))}
      <h2 className="mb-2 mt-0 text-4xl font-extrabold leading-tight text-primary">
        購入済みリスト
      </h2>
      {item.map((item) => (
        item.ispurchase === 1 && (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        )
      ))}

      




    </>
  );
}