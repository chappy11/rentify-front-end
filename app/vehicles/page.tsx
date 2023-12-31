'use client'

import { Cards } from "../resources/components";
import useGetAllVehicles from "../resources/hooks/vehicle/useGetAllVehicles";
import { useMemo } from "react";
import { Routes } from "../resources/types/Routes.enum";

export default function Vehicles() {
    const {data:vehicles} = useGetAllVehicles();
    
    const displayVehicles = useMemo(() => {
        if(!vehicles){
            return;
        }

        if(vehicles.length < 1){
            return (<p>No Vehicle found</p>)
        }


        return vehicles.map((val,i)=>(
            <Cards vehicle={val} key={i.toString()} onClick={()=>window.location.href=`${Routes.VIEW_VEHICLE}?id=${val.vehicle_id}`}/>
        ))
    }, [vehicles])
    
    return(
    <div className=' pt-32'>
        <div className=' grid grid-cols-5'>
            {displayVehicles}
        </div>
    </div>
  )
}
