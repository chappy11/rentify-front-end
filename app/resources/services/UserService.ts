
import axiosInstance from '../utils/axiosInstance';
const headers = {
    'Content-Type':'text/plain'
}
export const register = async(payload:any) =>{
    const resp = await axiosInstance.post(`user/register`,payload,{headers});

    return resp;
}

export const userLogin = async(payload:any)=>{
    const resp = await axiosInstance.post(`user/login`,payload,{headers});

    return resp;
}

export const updateToOwner = async(formdata:any)=>{
    const resp = await axiosInstance.post(`user/updatetoowner`,formdata,{headers:{'Content-Type':'multipart/form-data'}});

    return resp;
}

