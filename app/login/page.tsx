import Link from "next/link";
import { Button, TextInput } from "../resources/components";
import { Routes } from "../resources/types/Routes.enum";

export default function Login() {
  return (
    <div className=" pt-32 flex flex-1  h-screen justify-center items-center">
        <div className=" bg-white w-1/2 p-8 rounded-md  shadow-md">
            <h1 className=" font-bold text-2xl">Sign In</h1>
            <TextInput label="Username"/>
            <div className=" h-5"/>
            <TextInput label="Password" type="password"/>
            <div className=" h-6"/>
            <Button text="Sign In"/>
            <div className=" h-8"/>
            <p className=" text-center">Dont have any account? <Link href={Routes.SIGN_UP} className=" text-blue-600">Sign Up</Link></p>
        </div>
    </div>
  )
}
