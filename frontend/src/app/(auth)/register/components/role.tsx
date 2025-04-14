"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function RoleReg() {
  const router = useRouter();
  return (
    <div className="flex justify-center mt-[80px]">
      <div
        role="card"
        className="w-[500px] h-[600px] bg-white rounded-4xl shadow-md/30"
      >
        <div className="flex justify-center">
          <Image
            src={
              "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744463709/logo_lwqsy2.png"
            }
            alt="logo-gp"
            width={200}
            height={100}
          />
        </div>
        <div className="flex flex-col gap-3 items-center">
          <h1 className="font-audio subpixel-antialiased text-[30px]">
            REGISTER AS
          </h1>
          <div className="flex gap-10 mt-[50px]">
            <button
              onClick={() => router.push("/customer")}
              className="font-audio w-[150px] h-[150px] shadow-md/50 bg-red-300 rounded-4xl hover:cursor-pointer hover:bg-red-500"
            >
              CUSTOMER
            </button>
            <button
              onClick={() => router.push("/organizer")}
              className="font-audio w-[150px] h-[150px] shadow-md/50 bg-red-300 rounded-4xl hover:cursor-pointer hover:bg-red-500"
            >
              ORGANIZER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
