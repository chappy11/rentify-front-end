import { useCallback, useEffect, useState } from 'react';
import { getVehicleById } from '../../services/VehicleService';

export default function useGetVehicleByUserId() {
  
    const [data,setData] = useState<any[]>([]);

    const sendRequest = useCallback(
      async() => {
        try {
            const storage = await localStorage.getItem('account');
            if(!storage){
                return;
            }

            const user = JSON.parse(storage);
            const resp = await getVehicleById(user?.user_id);

            setData(resp.data.data);
        } catch (error) {
            console.log(error)
        }
      },
      [],
    )
    
    useEffect(() => {
      sendRequest();
    }, [])
    
    return{
        data,
        sendRequest
    }
}
