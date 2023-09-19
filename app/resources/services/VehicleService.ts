import axiosInstance from "../utils/axiosInstance";

export const addNewVehicle = async(formData:any)=>{
    const resp = await axiosInstance.post(`vehicle/create`,formData,{headers:{
        'Content-Type':'multipart/form-data'
    }});

    return resp;
}


export const getVehicleById = async(userId:string)=>{
    const resp = await axiosInstance.get(`vehicle/myvehicle/${userId}`)


    return resp;
}

export const getVehicles = async()=>{
    const resp = await axiosInstance.get(`vehicle/vehicles`);

    return resp;
}

export const getVehicleDetails = async(id:string)=>{
    const resp = await axiosInstance.get(`vehicle/details/${id}`);

    return resp;
}