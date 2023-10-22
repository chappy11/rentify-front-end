import React, { useCallback, useEffect, useState } from 'react'
import useGetAccountFromStorage from '../useGetAccountFromStorage';
import { getBookingByStatus } from '../../services/BookingsService.service';
import useAlertOption from '../useAlertOption';

type Params = {
    status:string;
}

export default function useGetBookingsByStatus(props:Params) {
    const [data,setData] = useState<any>([]);
    const {user} = useGetAccountFromStorage();
    const {status} = props;
    const {alertError} = useAlertOption();

    const sendRequest = useCallback(
      async() => {
        try {
            if(!user){
                return;
            }
            const response = await getBookingByStatus(user.user_id,status);

            setData(response.data);
        } catch (error) {
            alertError();
        }
      },
      [alertError, status, user],
    )
    
  
    useEffect(() => {
      sendRequest();
    }, [])
    
    return {
       data 
    }
}
