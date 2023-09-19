/* eslint-disable @next/next/no-img-element */
'use client'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
 
import { useSearchParams } from 'next/navigation';
import useGetVehicleDetails from '../resources/hooks/vehicle/useGetVehicleDetails';
import { configVariable } from '../resources/constant/ConfigVariable';
import { ListItem } from '../resources/components';
export default function ViewVehicle() {
    const params = useSearchParams();
    const vehicle_id = params.get('id');
    const {data:vehicle} = useGetVehicleDetails({id:vehicle_id ? vehicle_id:''})

    return (
        <div className=' flex pt-32 justify-center'>
            <div className=' p-8 bg-white w-1/2'>
            <h3 className=' font-bold'>Vehicle Details</h3>
            <div className=' flex'>
                <div className=' flex flex-1'>
                    <img src={(configVariable.BASE_URL as string)+vehicle?.vehicleImage} alt='vehicle image' className=' h-[300px] w-[300px]'/>
                </div>
                <div className=' px-4 flex flex-1 flex-col'>
                    <p className=' font-bold'>{vehicle?.description}</p>
                    <div className=' h-[0.5px] bg-slate-300 my-2'/>
                    <div className=' h-2'/>
                    <ListItem label='Brand' value={vehicle?.brand as string}/>
                    <ListItem label='Year Model' value={vehicle?.model as string} />
                    <ListItem label='Vehicle Type' value={vehicle?.vehicle_type as string}/>
                </div>
            </div>
            {vehicle_id} 
                <Calendar  selectRange={true}/>
            </div>
        </div>  
    )
}
