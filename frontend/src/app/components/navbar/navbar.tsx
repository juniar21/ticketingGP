"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavbarPage() {
  const router = useRouter()
  return (
    <div className="h-[50px] px-5 bg-white flex justify-between gap-5 items-center">
      <Image
        className=""
        src={
          "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744446090/logo_header_enx3t9.svg"
        }
        alt="logo-moto"
        width={300}
        height={300}
      />
      <input
        role="search-bar"
        placeholder="search 🔍"
        className="w-[200px] h-[40px] p-2 bg-gray-200 shadow-md flex items-center justify-center rounded-md"
      ></input>
      <div role="account log" className="flex gap-5">
        <div 
        onClick={()=> router.push("/register")}
        className="bg-red-500 w-[100px] h-[40px] rounded-md flex justify-center items-center shadow-md hover:cursor-pointer hover:bg-red-300">
          Register
        </div>
        <div className="bg-red-500 w-[100px] h-[40px] rounded-md flex justify-center items-center shadow-md hover:cursor-pointer hover:bg-red-300">
          Log In
        </div>
      </div>
    </div>
  );
}
