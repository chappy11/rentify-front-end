'use client';
import { useMemo } from "react";
import { Button } from "../resources/components";
import useGetVehicleByUserId from "../resources/hooks/vehicle/useGetVehicleByUserId";
import { Routes } from "../resources/types/Routes.enum";
import { configVariable } from "../resources/constant/ConfigVariable";

;
export default function Vehicle() {
    const {data} = useGetVehicleByUserId();
    function handleAddVehicle(){
        window.location.href=Routes.ADD_VEHICLE
    }

    const displayData = useMemo(() => {
        if(data.length < 1){
            return <p className=" text-center">No Vehicle Found</p>
        }

        return data.map((val,i)=>(
            <div className=" flex flex-row border-b border-b-slate-300" key={val.vehicle_id}>
                <div>
                    <img className=" h-52 w-52" src={configVariable.BASE_URL+val.vehicleImage} alt="vehicle"/>
                </div>
                <div className=" py-5 px-8">
                    <p className=" font-bold">{val.description}</p>
                    <div className=" h-5"/>
                    <p className=" py-1"><span>Brand: </span>{val.brand}</p>
                    <p className=" py-1"><span>Model: </span>{val.model}</p>
                    <p className=" py-1"><span>Vehicle Type: </span>{val.vehicle_type}</p>
                    <p className=" py-1"><span>Price: </span>{val.price}</p>
                </div>
            </div>
        ))

    }, [data])

    return (
    <div className=' pt-32 flex justify-center'>
        <div className=" bg-white w-1/2 p-8">
            <div className=" flex flex-row">
                <div className=" flex items-center">
                    <h1 className=" text-xl font-bold">Vehicle</h1>
                </div>
                <div className=" flex flex-1 justify-end">
                    <div className=" w-1/4">
                        <Button text="Add Vehicle" onClick={handleAddVehicle}/>
                    </div>
                </div>
            </div>
            <div className=" h-10"/>
            {displayData}
            <div/>
         </div>        
    </div>
  )
}
