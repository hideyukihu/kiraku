import { useState, ChangeEvent, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import createAxiosInstance from '../utils/axios';
import { Item } from '../types/Item';
import { Category } from '../types/Category';
import { Unit } from '../types/Unit';
import { Plan } from '../types/Plan';
import { useRouter } from 'next/router';
import axios from 'axios';
import Selectbox from '../components/Selectbox';
import ShoppingList  from '../components/ShopList';


export default function List() {
  const router = useRouter();

  const [category, setCategory] = useState<Category[]>([]);
  const [unit, setUnit] = useState<Unit[]>([]);
  const [item, setItem] = useState<Item>({
    name: '',
    category_id: 0,
    unit_id: 0,
  });
  const [plan, setPlan] = useState<Plan[]>([]);

  interface AverageConsumption {
    [key: string]: number;
  }
  // averageComsumptionオブジェクトを初期化
  const [averageComsumption, setAverageComsumption] = useState<AverageConsumption>({
  });

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
    // try {
      const response = await Axios.get('/api/plans');
      console.log(response.data);
      setPlan(response.data);
  };
  

  const logout = () => {
    Axios.post('/api/logout').then((res) => {
      console.log(res);
      router.push('/');
    })
  };

  useEffect(() => {
    const fetchData = async () => {
      await categoryindex();
      await unitindex();
      await planindex();
    };
  
    fetchData();
  }, []);
  

  const itemstore = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await Axios.post('/api/items', item)
      .then((res) => {
        console.log(res);

        Axios.post('/api/plans', res.data)
          .then((res) => {
            console.log(res);
            planindex();
          })

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
          .then((res: any) => {
            console.log(res.data);
            planindex();
          });
        if (updatedPlan.is_purchase === 1) {
          Axios.post(`/api/purchases`, { plan_id: id })
            .then((res: any) => {
            });
        }
      });


      Axios.post(`api/purchases/average-consumption`, { plan_id: id })
      .then((res: any) => {
        console.log(res.data);
        setAverageComsumption(res.data );
        console.log(averageComsumption); // ここでは更新される前の値が表示される
      })
      .then(() => {
        console.log(averageComsumption); // ここで更新後の値が表示される
      });
    
  };

  return (
    <>
      <h2 className="mb-2 mt-0 text-4xl font-extrabold leading-tight text-primary">
        買い物リスト登録
      </h2>
      <div>
        <label htmlFor="categoryname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">カテゴリー</label>
        <Selectbox value={item.category_id} options={category} onChange={handleChangeCategory} optiontheme="カテゴリーを選択してください"/>
      </div>
      <div>
        <label htmlFor="item" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">品名</label>
        <input value={item.name} onChange={handleChangeName} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
      </div>
      <div>
        <label htmlFor="categoryname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">単位</label>
        <Selectbox value={item.unit_id} options={unit} onChange={handleChangeUnit} optiontheme="単位を選択してください"/>
      </div>

      <button onClick={itemstore} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2">登録</button>

      <ShoppingList plan={plan} chengePlanIsPurchase={chengePlanIsPurchase} averageComsumption={averageComsumption}/>

      <Link href="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block my-2">ログイン画面へ</Link>
      <button onClick={logout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2">ログアウト</button>



    </>
  );
}
