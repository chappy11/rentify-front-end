import { UserDto } from "./UserDto.type";

export type VehicleDto = {
    vehicle_id:string;
    brand:string;
    description:string;
    vehicle_type:string;
    model:string;
    vehicleIsActive:string;
    vehicleOr:string;
    vehicleCr:string;
    vehicleImage:string;
    user_id:string;
}


export type VehicleDetailsDto = VehicleDto & UserDto;