'use client';

import React from 'react'
import { Button } from '../resources/components'
import { Routes } from '../resources/types/Routes.enum'

export default function page() {
  return (
    <div className=' pt-32 flex justify-center'>
        <div className=" bg-white w-1/2 p-8">
            <div className=' flex w-full '>
                <div className=' flex flex-1'>
                    <h1>My Drivers</h1>
                </div>
                <div className=' flex flex-1 justify-end'>
                    <Button text='Add Driver'  onClick={()=>window.location.href=Routes.CREATE_DRIVER}/>
                </div>
            </div>
        </div>
    </div>
  )
}
