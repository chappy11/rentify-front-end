type Name = {
    firstName:string;
    middleName?:string;
    lastName:string;
}

export const formatFullName = (params:Name) =>{

    return params.firstName +' '+params?.middleName +' '+params.lastName;
} 