import React from 'react';

// オプションの型を定義
export type Option = {
  id: number;
  name: string;
};

// propsの型を定義
type SelectboxProps = {
  value: number | string;
  options: Option[];
  optiontheme: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Selectbox: React.FC<SelectboxProps> = ({ value, options, optiontheme, onChange }) => {

  return (
    <select
      value={value}
      onChange={onChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option value="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{optiontheme}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Selectbox;
