import { useCallback, useEffect, useState } from 'react';
import { VehicleDetailsDto } from '../../types/VehicleDto.type';
import { getVehicleDetails } from '../../services/VehicleService';

type Props = {
    id:string;
}


export default function useGetVehicleDetails(props:Props) {
    const [data,setData] = useState<VehicleDetailsDto|null>(null)
    
    const sendRequest = useCallback(async()=>{
        try {
            const resp = await getVehicleDetails(props.id);

            setData(resp.data.data);
        } catch (error) {
            
        }
    },[props.id])

    useEffect(()=>{
        sendRequest();
    },[])

    return {
        data,
        sendRequest
    }
}
