'use client';
import React, { useMemo, useState } from 'react'
import { Button, TextInput } from '../resources/components';
import useAlertOption from '../resources/hooks/useAlertOption';
import { dataIsRequired } from '../resources/constant/String';
import { updateToOwner } from '../resources/services/UserService';
import Swal from 'sweetalert2';
import { Routes } from '../resources/types/Routes.enum';

export default function RegisterOwner() {
  const [img,setImg] = useState<any>(null);
  const [docsType,setDocsType] = useState<string>('');
  const {alertWarning,alertError,alertSuccess} = useAlertOption();

  
  const displayImage = useMemo(()=>{
    if(!img){
        return(
            <div className=' h-32 w-32 bg-slate-400'/>
        );
    }

    return (
        <img className=' h-32 w-32' src={URL.createObjectURL(img)}/>
    );
  },[img])
  
  async function handleSubmit(){
    try {
        const user = await localStorage.getItem('account');
       
        if(!user){
            return;
        }
        const userInfo = JSON.parse(user)
        if(!img){
            alertWarning(dataIsRequired('Image'));
            return;
        }

        if(!docsType){
            alertWarning(dataIsRequired("Document Type"));
            return;
        }

        let formdata = new FormData();
        formdata.append('docs',img);
        formdata.append('documentType',docsType);
        formdata.append('userId',userInfo.user_id);
        
        const resp = await updateToOwner(formdata);

        const {status,data,message} = resp.data;
    
        if(status!==1){
            alertError();
            return;
        }

        const respData = JSON.stringify(data);
        localStorage.setItem('account',respData);
        Swal.fire({
          title:'Success',
          text:'Successfully register as owner'
        }).then(e=>{
          if(e.isConfirmed){
            window.location.href=Routes.HOME
          }
        })
    
    } catch (error) {
     alertError();   
    }
  }

  return (
    <div className=' pt-28 flex justify-center items-center mb-14'>
        <div className=' bg-white w-1/2 p-8'>
            <h1 className=' font-bold text-xl'>Become Vehicle Owner</h1>
            <div className=' h-10'/>
            <div className=' flex justify-center'>
                {displayImage}
            </div>
          
            <input className=' ' type='file' onChange={(e)=> setImg(e?.target?.files?.[0])}/>
            <div className=' h-10'/>
            <TextInput label='Document Type' onChange={(e)=>setDocsType(e.target.value)}/>
            <div className=' h-10'/>
            <Button text='Submit' onClick={()=>handleSubmit()}/>
        </div>
    </div>
  )
}
