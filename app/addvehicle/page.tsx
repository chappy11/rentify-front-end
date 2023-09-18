'use client'

import { useState, useMemo } from "react";
import { TextInput, Select, Button } from "../resources/components";
import { SelectInputOption } from "../resources/types/SelectOptionType.type";
import useAlertOption from "../resources/hooks/useAlertOption";
import { dataIsRequired } from "../resources/constant/String";
import { addNewVehicle } from "../resources/services/VehicleService";
import Swal from "sweetalert2";
import { Routes } from "../resources/types/Routes.enum";

const VEHICLE_TYPE:SelectInputOption[] = [
    {
        name:'SUV',
        value:'SUV'
    },
    {
        name:"CAR",
        value:'CAR'
    },
    {
        name:'TRUCK',
        value:'TRUCK'
    }
];


export default function AddVehicle() {
    const [img,setImg] = useState<any>(null);
    const [orImg,setOrImg] = useState<any>(null);
    const [crImg,setCrImg] = useState<any>(null);
    const [vehicleType,setVehicleType] = useState<string>('');
    const [brand,setBrand] = useState<string>('');
    const [model,setModel] = useState<string>('');
    const [description,setDescription] = useState<string>('');
    const {alertWarning,alertError} = useAlertOption();


    const displayImage = useMemo(()=>{
        if(!img){
            return (<div className=" h-52 w-52 bg-slate-200"/>)
        }

        return <img className=" h-52 w-52" src={URL.createObjectURL(img)} alt="img"/>
    },[img])
  
    const displayOr = useMemo(()=>{
        if(!orImg){
            return (<div className=" h-52 w-52 bg-slate-200"/>)
        }

        return <img className=" h-52 w-52" src={URL.createObjectURL(orImg)} alt="or"/>
    },[orImg]);

    const displayCr = useMemo(()=>{
        if(!crImg){
            return (<div className=" h-52 w-52 bg-slate-200"/>)
        }

        return <img className=" h-52 w-52" src={URL.createObjectURL(crImg)} alt="cr"/>
    },[crImg]);

    async function handleSubmit(){
        try {

            const storage = await localStorage.getItem('account');
            if(!storage){
                return;
            }
            const user = JSON.parse(storage);
            if(!img){
                alertWarning(dataIsRequired('Vehicle Image'));

                return;
            }

            if(!brand){
                alertWarning(dataIsRequired('Brand'));

                return;
            }

            if(!description){
                alertWarning(dataIsRequired('Description '));

                return;
            }

            if(!vehicleType){
                alertWarning(dataIsRequired('Vehicle Type '));

                return;   
            }

            if(!model){
                alertWarning(dataIsRequired('Model'));

                return;   
            }

            if(!orImg){
                alertWarning(dataIsRequired('Official Receipt Image'));

                return;   
            }

            if(!crImg){
                alertWarning(dataIsRequired('Certificate of Registration Image'));

                return;   
            }

            let formdata = new FormData();
            formdata.append('userId',user.user_id);
            formdata.append('or',orImg);
            formdata.append('cr',crImg);
            formdata.append('img',img);
            formdata.append('brand',brand);
            formdata.append('model',model);
            formdata.append('description',description);
            formdata.append('vehicleType',vehicleType);
            const resp = await addNewVehicle(formdata);
            const {status} = resp.data;

            if(status === 1){
                Swal.fire({
                    text:'Successfully Added',
                    icon:'success'
                }).then(e=>{
                    if(e.isConfirmed){
                        window.location.href=Routes.VEHICLE
                    }
                })
                
                return;
            }
            alertError();
        } catch (error) {
               alertError()
        }
    }

    return (
    <div className=' pt-32 flex justify-center'>
        <div className=" bg-white w-1/2 p-8">
            <h1>Vehicle</h1>
            <div className=" flex justify-center">
                {displayImage}    
            </div>
            <div className=" h-10"/>
            <input type='file' onChange={(e)=>setImg(e.target?.files?.[0])}/>
            <div className=" h-5"/>
            <TextInput label="Brand" onChange={(e)=>setBrand(e.target.value)} value={brand}/>
            <div className=" h-3"/>
            <TextInput label="Description" onChange={(e)=>setDescription(e.target.value)} value={description}/>
            <div className=" h-3"/>
            <p className=" text-sm mb-3">Vehicle Type</p>
            <Select options={VEHICLE_TYPE} selectedOption={vehicleType} setSelectedOption={setVehicleType}/>
            <div className=" h-3"/>
            <TextInput label="Model" onChange={(e)=>setModel(e.target.value)} value={model}/>
            <div className=" h-8"/>
            <div className="flex flex-row">
                <div className=" flex flex-col items-center justify-center">
                    <h3>Official Receipt</h3>
                    {displayOr}

                    <input type="file" onChange={(e)=>setOrImg(e.target.files?.[0])}/>
                </div>
                <div className=" flex justify-center flex-col items-center">
                    <h3>Certificate of Registration</h3>
                    {displayCr}
                    <input type="file" onChange={(e)=>setCrImg(e.target.files?.[0])}/>
                </div>
              
            </div>
            <Button text="Submit" onClick={()=>handleSubmit()}/>
        </div>        
    </div>

  )
}
