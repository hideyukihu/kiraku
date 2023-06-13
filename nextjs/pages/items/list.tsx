import { useState, ChangeEvent, useEffect, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactFragment, ReactPortal } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import createAxiosInstance from '../utils/axios';
import { Item } from '../types/Item';
import { Category } from '../types/Category';
import { Unit } from '../types/Unit';
import { Plan } from '../types/Plan';


export default function List() {

  const [category, setCategory] = useState<Category[]>([]);
  const [unit, setUnit] = useState<Unit[]>([]);
  const [item, setItem] = useState<Item>({
    name: '',
    category_id: 0,
    unit_id: 0,
  });
  const [plan, setPlan] = useState<Plan[]>([]);


  function handleChangeCategory(e: any) {
    setItem({ name: item.name, category_id: e.target.value, unit_id: item.unit_id });
  }
  function handleChangeUnit(e: any) {
    setItem({ name: item.name, category_id: item.category_id, unit_id: e.target.value });
  }
  function handleChangeName(e: any) {
    setItem({ name: e.target.value, category_id: item.category_id, unit_id: item.unit_id });
  }

  console.log(item);






  // 関数を呼び出してAxiosインスタンスを取得
  const Axios = createAxiosInstance();



  const categoryindex = async () => {
    await Axios.get('/api/categories')
      .then((res) => {
        console.log(res.data);
        setCategory(res.data);
      });
  };

  const unitindex = async () => {
    await Axios.get('/api/units')
      .then((res) => {
        console.log(res.data);
        setUnit(res.data);
      });
  };

  const planindex = async () => {
    await Axios.get('/api/plans')
      .then((res) => {
        console.log(res.data);
        setPlan(res.data);
      });
  };

  useEffect(() => {
    categoryindex();
    unitindex();
    planindex();




  }, []);

  const itemstore = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await Axios.post('/api/items', item)
      .then((res) => {
        console.log(res);
      });
  };


  const chengePlanIsPurchase = (id: any) => {
    Axios.get(`/api/plans/${id}`)
      .then((res) => {
        console.log(res.data);
        const updatedPlan = {
          ...res.data,
          is_purchase: res.data.is_purchase === 0 ? 1 : 0
        };
        Axios.put(`/api/plans/${id}`, updatedPlan)
          .then((res) => {
            console.log(res.data);
            planindex();

          });


      });


  };

  return (

    <>
      <h2 className="mb-2 mt-0 text-4xl font-extrabold leading-tight text-primary">
        買い物リスト登録
      </h2>


      <div>
        <label htmlFor="categoryname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">カテゴリー</label>
        <div>
          <select value={item.category_id} onChange={handleChangeCategory} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">カテゴリーを選択してください</option>
            {category.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="item" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">品名</label>
        <input value={item.name} onChange={handleChangeName} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
      </div>

      <div>
        <label htmlFor="categoryname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">単位</label>
        <div>
          <select value={item.unit_id} onChange={handleChangeUnit} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">単位を選択してください</option>
            {unit.map((unit) => (
              <option key={unit.id} value={unit.id}>{unit.name}</option>
            ))}
          </select>
        </div>
      </div>



      <button onClick={itemstore} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-2">登録</button>
      <Link href="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">ログイン画面へ</Link>

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
          {plan.map((plan:any) => {
            if (plan.is_purchase === 0) {
              return (
                <tr key={plan.id} className="text-gray-700">
                  <td className="w-1/3 border-b-2 p-4 dark:border-dark-5 text-center">{plan.item_id}</td>
                  <td className="w-1/3 border-b-2 p-4 dark:border-dark-5 text-center">{plan.quantity}</td>
                  <td className="w-1/3 border-b-2 p-4 dark:border-dark-5">
                    <button onClick={() => chengePlanIsPurchase(plan.id)} className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-300 m-2">購入済み</button>
                  </td>
                </tr>
              );
            }
            return null;  // is_purchaseが0でない場合は何も表示しない
          })}
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
          {plan.map((plan:any) => (
            plan.is_purchase === 1 && (
              <tr key={plan.id} className="text-gray-700">
                <td className="w-1/3 border-b-2 p-4 dark:border-dark-5 text-center">{plan.item_id}</td>
                <td className="w-1/3 border-b-2 p-4 dark:border-dark-5 text-center">{plan.quantity}</td>
                <td className="w-1/3 border-b-2 p-4 dark:border-dark-5">
                  <button onClick={() => chengePlanIsPurchase(plan.id)} className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-300 m-2">買い物リストへ戻す</button>
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