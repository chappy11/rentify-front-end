import axiosInstance from "../utils/axiosInstance"

const headers = {
    "Content-Type":"text/plain"
}

export const createBooking = async(payload:any) =>{
    const response = await axiosInstance.post('bookings/create',payload,{headers})

    return response.data;
}

export const getBookingByStatus = async(user_id:string,status:string)=>{
    const response = await axiosInstance.get(`bookings/getbookingbystatus/${user_id}/${status}`)

    return response.data;
}