import React from 'react';
import { Plan } from '../types/Plan';

type ShoppingListProps = {
  plan: Plan[];
  chengePlanIsPurchase: (id: number) => void;
  averageComsumption: any;
};


const ShoppingList= ({ plan, chengePlanIsPurchase, averageComsumption }: ShoppingListProps) => {
  return (
    <>
      <h2 className="mb-2 mt-0 text-4xl font-extrabold leading-tight text-primary">
        買い物リスト
      </h2>
      <table className="bg-white min-w-full">
        {/* Table header */}
        <thead>
          <tr>
            <th className="w-1/4 border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              品名
            </th>
            <th className="w-1/4 border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              カテゴリー
            </th>
            <th className="w-1/12 border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              数量
            </th>
            <th className="w-1/12 border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              単位
            </th>
            <th className="w-1/4 border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900"></th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {plan.map((planItem :any) => {
            if (planItem.is_purchase === 0) {
              return (
                <tr key={planItem.id} className="text-gray-700">
                  <td className="w-1/4 border-b-2 p-4 dark:border-dark-5 text-center">{planItem.items.name}</td>
                  <td className="w-1/4 border-b-2 p-4 dark:border-dark-5 text-center">{planItem.items.category.name}</td>
                  <td className="w-1/12 border-b-2 p-4 dark:border-dark-5 text-center">{planItem.quantity}</td>
                  <td className="w-1/12 border-b-2 p-4 dark:border-dark-5 text-center">{planItem.items.unit.name}</td>
                  <td className="w-1/4 border-b-2 p-4 dark:border-dark-5">
                    <button onClick={() => chengePlanIsPurchase(planItem.id)} className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-300 m-2">購入済み</button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>


      <h2 className="mb-2 mt-0 text-4xl font-extrabold leading-tight text-primary">
        購入済みリスト
      </h2>
      <table className="bg-white min-w-full">
        <thead>
          <tr>
            <th className="w-1/4 border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              品名
            </th>
            <th className="w-1/4  border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              カテゴリー
            </th>
            <th className="w-1/12 border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              数量
            </th>
            <th className="w-1/12  border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
              単位
            </th>
            <th className="w-1/4 border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900"></th>
            <th className="w-1/4 border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">平均消費日数（日数/数量）</th>
          </tr>
        </thead>
        <tbody>
          {plan.map((plan: any) => (
            plan.is_purchase === 1 && (
              <tr key={plan.id} className="text-gray-700" data-value={plan.id}>
                <td className="w-1/4 border-b-2 p-4 dark:border-dark-5 text-center">{plan.items.name}</td>
                <td className="w-1/4 border-b-2 p-4 dark:border-dark-5 text-center">{plan.items.category.name}</td>
                <td className="w-1/12 border-b-2 p-4 dark:border-dark-5 text-center">{plan.quantity}</td>
                <td className="w-1/12 border-b-2 p-4 dark:border-dark-5 text-center">{plan.items.unit.name}</td>
                <td className="w-1/4 border-b-2 p-4 dark:border-dark-5">
                  <button onClick={() => chengePlanIsPurchase(plan.id)} className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-300 m-2">買い物リストへ戻す</button>
                </td>
                <td className="w-1/12 border-b-2 p-4 dark:border-dark-5 text-center">{averageComsumption[plan.id]}</td>
              </tr>
            )
          ))}

        </tbody>
      </table>
    </>
  );
};

export default ShoppingList;
