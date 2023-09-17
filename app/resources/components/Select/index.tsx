'use client';
import React, { useState } from 'react';
import { SelectInputOption } from '../../types/SelectOptionType.type';

type Props = {
    selectedOption:string;
    setSelectedOption:React.Dispatch<React.SetStateAction<string>>;
    options:SelectInputOption[]
}

const SelectInput = (props:Props) => {
  const {setSelectedOption,selectedOption,options} = props;
 
  const handleSelectChange = (e:any) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="relative inline-flex w-full">
      <select
        className="appearance-none bg-white border w-full border-gray-300 rounded-md px-3 py-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {options.map((val,i)=>(
            <option value={val.value} key={i.toString()}>{val.name}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M7.293 8.293a1 1 0 011.414 0L10 9.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SelectInput;
