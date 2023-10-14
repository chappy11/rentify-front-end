'use client';

import Link from "next/link";
import { Button, TextInput } from "../resources/components";
import { Routes } from "../resources/types/Routes.enum";
import { useState } from "react";
import useAlertOption from "../resources/hooks/useAlertOption";
import { dataIsRequired } from "../resources/constant/String";
import { userLogin } from "../resources/services/UserService";
import Swal from "sweetalert2";

export default function Login() {
  const [username,setUsername] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const {alertWarning,alertSuccess,alertError} = useAlertOption(); 

  async function handleLogin(){
    try {
      if(!username){
        alertWarning(dataIsRequired('Username'));
        return;
      }

      if(!password){
        alertWarning(dataIsRequired('Password'));
        return;
      }

      const payload = {
        username,
        password
      }
      const resp = await userLogin(payload);
      const {status,message,data} = resp.data;
      if(status !== 1){
        alertError(message);
        return;
      }

      const userData = JSON.stringify(data);
      localStorage.setItem('account',userData);
      Swal.fire({
        icon:'success',
        title:'Success',
        text:'Successfully Login'
      }).then(e=>{
        if(e.isConfirmed){
          window.location.href=Routes.HOME
        }
      })
    } catch (error) {
      
    }
  }
  
  return (
    <div className=" pt-32 flex flex-1  h-screen justify-center items-center">
        <div className=" bg-white w-1/2 p-8 rounded-md  shadow-md">
            <h1 className=" font-bold text-2xl">Sign In</h1>
            <TextInput label="Username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
            <div className=" h-5"/>
            <TextInput label="Password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <div className=" h-6"/>
            <Button onClick={()=>handleLogin()} text="Sign In"/>
            <div className=" h-8"/>
            <p className=" text-center">Dont have any account? <Link href={Routes.REGISTER} className=" text-blue-600">Sign Up</Link></p>
        </div>
    </div>
  )
}
