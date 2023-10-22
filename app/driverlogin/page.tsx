'use client';
import React, { useState } from 'react'
import { Button, TextInput } from '../resources/components'
import Link from 'next/link';
import { Routes } from '../resources/types/Routes.enum';
import useAlertOption from '../resources/hooks/useAlertOption';
import { loginDriver } from '../resources/services/DriverService.service';
import Swal from 'sweetalert2';

export default function DriverLogin() {
const [username,setUsername] = useState<string>('');
const [password,setPassword] = useState<string>('');
const {alertWarning,alertError} = useAlertOption();

async function handleLogin(){
    try {
        if(!username || !password){
            alertWarning('Please fill out all fields')
            return;
        }

        const payload = {
            username,
            password
        }
        const result = await loginDriver(payload)

        if(!result.data){
            alertError(result.data.message);
            return;
        }

        const userData = await result.data;
        const stringData = JSON.stringify(userData)
         await localStorage.setItem('account',stringData);
         Swal.fire({
            icon:'success',
            title:'Success',
            text:'Successfully Login'
          }).then(e=>{
            if(e.isConfirmed){
              window.location.href=Routes.DRIVER_DASHBOARD
            }
          })
        } catch (error) {
        
    }
}
  return (
    <div className=" pt-32 flex flex-1  h-screen justify-center items-center">
        <div className=" bg-white w-1/2 p-8 rounded-md  shadow-md">
            <h1 className=" font-bold text-2xl">Welcome Driver</h1>
            <TextInput label="Username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
            <div className=" h-5"/>
            <TextInput label="Password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <div className=" h-6"/>
            <Button onClick={()=>handleLogin()} text="Sign In"/>
            <div className=" h-8"/>
            <p className=" text-center"><Link href={Routes.HOME} className=" text-blue-600">Back to Home </Link></p>
            
        </div>
    </div>  
  )
}
