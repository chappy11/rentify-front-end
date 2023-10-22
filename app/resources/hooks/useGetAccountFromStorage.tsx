import React, { useCallback, useEffect, useState } from 'react'

export default function useGetAccountFromStorage() {
    const [user,setUser] = useState<any>(null);
  
    const getUser = useCallback(async()=>{
        try {
            const resp = await localStorage.getItem('account');
            if(!resp){
                return;
            }
            const userData = JSON.parse(resp);
            setUser(userData);
        } catch (error) {
            
        }
    },[]);

    useEffect(() => {
      getUser();
    }, [])
    
    return {
        user,
        getUser
    }
}
