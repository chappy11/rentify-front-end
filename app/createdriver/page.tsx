'use client';
import React, { useState } from 'react'
import { Button, TextInput } from '../resources/components'
import useGetAccountFromStorage from '../resources/hooks/useGetAccountFromStorage';
import useAlertOption from '../resources/hooks/useAlertOption';
import { createDriver } from '../resources/services/DriverService.service';

export default function AddDriver() {
    const {user} = useGetAccountFromStorage();
    const [username,setUsername] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [firstname,setFirstname] = useState<string>('');
    const [middlename,setMiddlename] = useState<string>('');  
    const [lastname,setLastName] = useState<string>('');
    const {alertSuccess,alertError,alertWarning} = useAlertOption();
    const [contactNumber,setContactNumber] = useState<string>('');
    
    const onChangeText = (e:any,callback:(e:string)=>void) => {
        if(!e){
            return;
        }
        const value = e.target?.value;
        callback(value)
    }
    
    async function handleAddDriver(){
        try {
            if(!user){
                return;
            }
            console.log("GG");
            if(isFieldNotValid()){
                return;
            }

            const payload = {
                owner_id:user?.user_id,
                username,
                password,
                firstName:firstname,
                middleName:middlename,
                lastName:lastname,
                contactNumber
            }

            const result = await createDriver(payload);

            if(result.status === '1'){
                alertSuccess(result.message);   
            
                return;
            }

            alertError(result.message);
            
        } catch (error) {
            alertError();
        }
    }


    const isFieldNotValid = () =>{
        if(!username){
            alertWarning("Username is Required");
            return true;
        }

        if(!password){
            alertWarning("Password is Required");
            return true;
        }

        if(!firstname){
            alertWarning("Firstname is Required");
            return true;
        }

        if(!middlename){
            alertWarning("Middlename is Required");
            return true;
        }

        if(!lastname){
            alertWarning("Lastname is Required");
            return true;
        }

        if(!contactNumber){
            alertWarning("Lastname is Required");
            return true;
        }
      
        return false;
        
    }
  
    return (
    <div className=' w-full flex justify-center pt-32'>
        <div className=' w-1/2 bg-white p-4'>
            <h1 className=' text-xl font-bold'>Create Driver</h1>
            <div className=' h-5'/>
                <div className=' px-5'>
                <TextInput label='Username' value={username} onChange={(e)=>onChangeText(e,setUsername)}/>
                <div className=' h-5'/>
                <TextInput label='Password' value={password} type='password'  onChange={(e)=>onChangeText(e,setPassword)}/>
                <div className=' h-5'/>
                <TextInput label='Firstname' value={firstname}  onChange={(e)=>onChangeText(e,setFirstname)}/>
                <div className=' h-5'/>
                <TextInput label='Middlename' value={middlename}  onChange={(e)=>onChangeText(e,setMiddlename)}/>
                <div className=' h-5'/>
                <TextInput label='Lastname' value={lastname}  onChange={(e)=>onChangeText(e,setLastName)}/>
                <div className=' h-5'/>
                <TextInput label='Mobile Number' value={contactNumber}  onChange={(e)=>onChangeText(e,setContactNumber)} maxLength={11}/>
                <div className='h-10'/> 
                <Button text="Add This Driver" onClick={()=>handleAddDriver()}/>
            </div>
        </div>
    </div>
  )
}
