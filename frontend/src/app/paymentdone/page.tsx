
"use client"
import { useRouter } from "next/navigation";
import NavbarPage from "../components/navbar/navbar";
import { MdVerified } from "react-icons/md";
export default function PaymentDone() {
    const router = useRouter()
  return (
    <div>
      <NavbarPage />
      <div className="flex flex-col gap-10 justify-center items-center">
        <MdVerified size={200} color="green" />
        <p className="text-green-500 font-bold text-[30px]">Payment Successfull!</p>
        <button onClick={()=> router.push("/order")} className="w-[100px] h-[50px] bg-green-400 rounded-md hover: cursor-pointer">
          See Orders
        </button>
      </div>
    </div>
  );
}
