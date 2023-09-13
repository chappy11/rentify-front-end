'use client'

import Lottie from 'lottie-react';
import Car from './resources/assets/application.json';
import { vehicleCategory } from './resources/constant/Category';
import { useMemo } from 'react';
import { CarCard } from './resources/components';
export default function Home() {
  

  const displayImage = useMemo(()=>{
    return vehicleCategory.map((val,i)=>(
      // eslint-disable-next-line react/jsx-key
      <CarCard imagePath={val.image} name={val.name}/>
    ))
  },[])
  
  return (
    <main className="">
      <section className=' h-screen flex w-full '>
        <div className=' flex flex-1 flex-col justify-center ml-16'>
          <h1 className=' text-bold text-5xl font-extrabold'>Rentify</h1>
          <h3 className=' text-3xl mt-3'>Transport your materials or furniture <span className=' text-blue-800'>effortlessly.</span></h3>
        </div>
        <div className=' flex flex-1 justify-center item-center mt-10'>
          <Lottie animationData={Car} />
        </div>
      </section>
      <section className=' h-screen w-full pt-32'>
        <h3 className=' text-3xl  font-extrabold ml-16'>Vehicle Categories</h3>
          <div className=' grid grid-cols-4 px-10 justify-center items-center mt-24'>
            {displayImage}
          </div>  
      </section>
    </main>
  )
}
