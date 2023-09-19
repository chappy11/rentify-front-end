/* eslint-disable @next/next/no-img-element */
import { VehicleDto } from "../../types/VehicleDto.type";
import { configVariable } from "../../constant/ConfigVariable";

type Props = {
    vehicle:VehicleDto
    onClick:()=>void;
};

export default function index(props:Props) {
    const {vehicle_id,brand,model,vehicleImage,description} = props.vehicle;
    
    return (
    <div className=' bg-white mx-3  px-3 rounded-lg shadow-lg zoom group' onClick={()=>props.onClick()}>
        <div className=" h-[300px] flex justify-center items-center">
            <img
                src={configVariable.BASE_URL+vehicleImage}
                alt={`${brand+vehicle_id}`}
                className=" h-[300px]  w-full p-3"
            />
        </div>
        <p className=" font-bold text-center">{description}</p>
        <p>{model}</p>
    </div>
    )
}