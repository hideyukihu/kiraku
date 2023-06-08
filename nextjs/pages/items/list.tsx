import { useState, ChangeEvent, useEffect, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactPortal } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import createAxiosInstance from '../utils/axios';
import { Item } from '../types/Item';
import { Category } from '../types/Category';


export default function List() {

  const [name, setName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [category, setCategory] = useState<Category[]>([]);
  const [item, setItem] = useState<Item[]>([]);

  // 関数を呼び出してAxiosインスタンスを取得
  const Axios = createAxiosInstance();

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => setSelectedCategoryId(e.target.value);


  const categoryindex = async () => {
    await Axios.get('/api/categories')
      .then((res) => {
        console.log(res.data);
        setCategory(res.data);
      });
  };
  const fetchItem = async () => {
    await Axios.get('/api/items')
      .then((res) => {
        console.log(res.data);
        setItem(res.data);
      });
  };

  useEffect(() => {
    categoryindex();
    fetchItem();


  }, []);

  const itemstore = () => {
    Axios.post('/api/items', { name, category_id: selectedCategoryId })
      .then((res) => {
        console.log(res);
      });
  };


  const chengeItemIsPurchase = (id: any) => {
    Axios.get(`/api/items/${id}`)
      .then((res) => {
        console.log(res.data);
        const updatedItem = {
          ...res.data,
          is_purchase: res.data.is_purchase === 0 ? 1 : 0
        };
        Axios.put(`/api/items/${id}`, updatedItem)
          .then((res) => {
            console.log(res.data);
            fetchItem();

          });


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




      <button onClick={itemstore} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-2">登録</button>
      <Link href="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2">ログイン画面へ</Link>

      <h2 className="mb-2 mt-0 text-4xl font-medium leading-tight text-primary">

      </h2>


      <h2 className="mb-2 mt-0 text-4xl font-extrabold leading-tight text-primary">
        買い物リスト
      </h2>
      <table className="bg-white min-w-full">
        <thead>
          <tr>
            <th className="w-1/3  border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              品名
            </th>
            <th className="w-1/3  border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              数量
            </th>
            <th className="w-1/3 border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900"></th>
          </tr>
        </thead>
        <tbody>
          {item.map((item) => (
            item.is_purchase === 0 && (
              <tr key={item.id} className="text-gray-700">
                <td className="w-1/3 border-b-2 p-4 dark:border-dark-5 text-center">{item.name}</td>
                <td className="w-1/3 border-b-2 p-4 dark:border-dark-5 text-center">{item.plan_quantity}</td>
                <td className="w-1/3 border-b-2 p-4 dark:border-dark-5">
                  <button onClick={() => chengeItemIsPurchase(item.id)} className="bg-green-500 hover:bg-green-400 text-white px-4 py-2">購入済み</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>

      <h2 className="mb-2 mt-0 text-4xl font-extrabold leading-tight text-primary">
        購入済みリスト
      </h2>
      <table className="bg-white min-w-full">
        <thead>
          <tr>
            <th className="w-1/3 border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              品名
            </th>
            <th className="w-1/3 border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              数量
            </th>
            <th className="w-1/3 border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900"></th>
          </tr>
        </thead>
        <tbody>
          {item.map((item) => (
            item.is_purchase === 1 && (
              <tr key={item.id} className="text-gray-700">
                <td className="w-1/3 border-b-2 p-4 dark:border-dark-5 text-center">{item.name}</td>
                <td className="w-1/3 border-b-2 p-4 dark:border-dark-5 text-center">{item.plan_quantity}</td>
                <td className="w-1/3 border-b-2 p-4 dark:border-dark-5">
                  <button onClick={() => chengeItemIsPurchase(item.id)} className="bg-green-500 hover:bg-green-400 text-white px-4 py-2">買い物リストへ戻す</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>


    </>
  );
}

// export async function getServerSideProps(content:any) {
//   return {
//     props:{ message: 'helllo hideyukihu'}
//   }
// }