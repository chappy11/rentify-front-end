import axiosInstance from "../utils/axiosInstance"
const headers = {
    'Content-Type' : 'text/plain'
}
export const loginDriver = async(payload:any) =>{
    const resp = await axiosInstance.post('drivers/login',payload,{headers});

    return resp.data;
}

export const createDriver = async(payload:any)=>{
    const resp = await axiosInstance.post('drivers/create',payload,{headers});

    return resp.data;
}