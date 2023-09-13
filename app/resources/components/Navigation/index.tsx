import Link from "next/link";
import { Routes } from "../../types/Routes.enum";

export default function Navigation() {
  return (
    <nav className=' p-3 bg-black flex fixed w-screen z-50'>
        <ul className=" px-4">
            <li className=" p-3 text-white font-bold text-xl">
                Rentify
            </li>
        </ul>
        <ul className=" flex flex-1 py-3 mr-10 justify-end">
            <Link href={Routes.HOME}  className=" text-white px-4 hover:text-slate-300" >
                Home
            </Link>
            <li className=" text-white px-4">
                About
            </li>
            <Link href={Routes.LOGIN}  className=" text-white px-4 hover:text-slate-300" >
                Login
            </Link>
        </ul>
    </nav>
  )
}
