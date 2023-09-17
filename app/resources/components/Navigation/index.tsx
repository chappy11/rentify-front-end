'use client';

import Link from "next/link";
import { Routes } from "../../types/Routes.enum";
import { useEffect, useMemo, useState } from "react";

export default  function Navigation() {
    const [user,setUser] = useState<any>(null);
    const getUser = async()=>{
        const data = await localStorage.getItem('account');
        if(!data){
            return;
        }
        const userData = JSON.parse(data);

        setUser(userData)
    }

    const displayUser = useMemo(()=>{
        if(!user){
           return(<>
            <li className=" text-white px-4">
                About
            </li>
            <Link href={Routes.LOGIN}  className=" text-white px-4 hover:text-slate-300" >
                Login
            </Link>
        </>)
           
        }

        if(user.user_type === 'OWNER'){
            return(<>
                <Link href={Routes.REGISTER_OWNER}>
                    <li className=" text-white px-4">
                       My Vehicle
                    </li>
                    </Link>
                    <Link href={Routes.LOGIN}  className=" text-white px-4 hover:text-slate-300" >
                        {user?.username}
                    </Link>
                </>)    
        }

        return(<>
        <Link href={Routes.REGISTER_OWNER}>
            <li className=" text-white px-4">
                Become a Owner
            </li>
            </Link>
            <Link href={Routes.LOGIN}  className=" text-white px-4 hover:text-slate-300" >
                {user?.username}
            </Link>
        </>)
        
    },[user])
    
    useEffect(()=>{
        getUser()
    },[])
    return (
    <nav className=' p-3 bg-black flex fixed w-screen z-50'>
        <ul className=" px-4">
            <li className=" p-3 text-white font-bold text-xl">
                Rentify
            </li>
        </ul>
        <ul className=" flex flex-1 py-3 mr-10 justify-end">
            <Link href={Routes.HOME}  className=" text-white px-4 hover:text-slate-300" >
                Home
            </Link>
            {displayUser}
        </ul>
    </nav>
  )
}
