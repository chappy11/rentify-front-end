'use client';

import React, { useState } from 'react'
import { Button, Select, TextInput } from '../resources/components'
import { SelectInputOption } from '../resources/types/SelectOptionType.type';
import Link from 'next/link';
import { Routes } from '../resources/types/Routes.enum';
import useValidateRegisterInfo from './hooks/useValidateRegisterInfo';
import { register } from '../resources/services/UserService';
import useAlertOption from '../resources/hooks/useAlertOption';
import Swal from 'sweetalert2';


const genderOption:SelectInputOption[] = [
    {
        name:'Male',
        value:'Male'
    },
    {
        name:'Female',
        value:'Female'
    }
];

function Register() {
    const [selectedGender,setSelectedGender] = useState<string>('');
    const {validateRegisterInfo,firstName,setFirstName,middleName,setMiddleName,lastName,setLastName,username,setUsername,password,setPasssword,confirmPassword,setConfirmPassword,birthdate,setBirthdate,mobileNumber,setMobileNumber,email,setEmail,address,setAddress,gender,setGender} = useValidateRegisterInfo();
    const {alertSuccess,alertError} = useAlertOption();
    async function handleRegister(){
       
        try {
            
            if(!validateRegisterInfo()){
                return;
            }

            const payload = {
                userName:username,
                password,
                firstName,
                middleName,
                lastName,
                email,
                mobileNumber,
                gender,
                birthdate,
                address
            }
            const resp = await register(payload);
            const {status} = resp.data;
            if(status === 1){
                Swal.fire({
                    title:'Success',
                    text:'Successfully Registered',
                }).then((e)=>{
                    if(e.isConfirmed){
                        window.location.href=Routes.LOGIN
                    }
                })
                return;
            }

            alertError()
        } catch (error) {
            alertError()
        }
  
    }

    return (
    <div className=' pt-28 flex justify-center items-center mb-14'>
        <div className=' bg-white w-1/2 p-8'>
            <h1 className=" font-bold text-xl">Sign Up</h1>
           <div className=' h-10'/>
           <TextInput label='Username' onChange={(e)=>setUsername(e.target.value)} value={username}/>
           <div className=' h-5'/>
           <TextInput label='Password' type='password'  onChange={(e)=>setPasssword(e.target.value)} value={password}/>
           <div className=' h-5'/>
           <TextInput label='Confirm Password' type='password' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} />
           <div className=' h-5'/>
            <div className=' flex justify-between'>
                <div className=''> 
                    <TextInput label={'FirstName'} value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                </div>
                <div className=' flex'> 
                    <TextInput label={'MiddleName'} value={middleName} onChange={(e)=>setMiddleName(e.target.value)}/>
                </div>
                <div className=' flex'> 
                    <TextInput label={'Last Name'} value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                </div>
            </div> 
            <div className=' flex justify-between'>
                <div className=' w-full mr-2'> 
                    <TextInput label={'Email'} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className=' flex w-full ml-2'> 
                    <TextInput label={'Mobile Number'} value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)}/>
                </div>
            </div>
            <div className=' h-5'/>
            <p className=' text-sm mb-2'>Gender</p>
            <Select selectedOption={gender} setSelectedOption={setGender} options={genderOption}/>
            <div className=' h-5'/>
            <p className=' text-sm mb-2'>Birthdate</p>
            <TextInput label='' type='date' value={birthdate} onChange={(e)=>setBirthdate(e.target.value)}/>
            <div className=' h-5'/>
            <TextInput label='Address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
            <div className=' h-8'/>
            <Button text='Sign Up' onClick={handleRegister}/>
            <p className=' mt-5 text-center'>Already have account? <Link href={Routes.LOGIN} className=' text-blue-600'>Login</Link></p>
        </div>
    </div>
  )
}

export default Register