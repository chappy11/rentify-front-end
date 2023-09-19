import { useCallback, useEffect, useState } from "react";
import { getVehicles } from "../../services/VehicleService";
import useAlertOption from "../useAlertOption";
import { VehicleDto } from "../../types/VehicleDto.type";

export default function useGetAllVehicles() {
    const [data,setData] = useState<VehicleDto[]>();
    const {alertError} = useAlertOption();
    const sendRequest = useCallback(
      async() => {
        try {
            const resp = await getVehicles();
            
            if(!resp){
                alertError();
                return;
            } 

            setData(resp.data.data);
        } catch (error) {
            alertError()
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
