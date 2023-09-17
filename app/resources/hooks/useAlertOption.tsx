
import React from 'react'
import Swal from 'sweetalert2'

export default function useAlertOption() {
  
    const alertSuccess = (message:string) =>{
        Swal.fire('Oops',message,'success');

    }

    const alertError = (message?:string) =>{
        if(!message){
            message = "Something went wrong";
        }
        Swal.fire('Oops',message,'error');

    }

    const alertWarning = (message:string) =>{
        Swal.fire('Oops',message,'warning');
    }
  
    return {
        alertSuccess,
        alertError,
        alertWarning,
  }
}
