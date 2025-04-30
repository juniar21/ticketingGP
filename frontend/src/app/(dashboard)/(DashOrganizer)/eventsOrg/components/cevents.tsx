"use client"
import { useRouter } from "next/navigation";

export default function CEvents() {
    const router = useRouter()
  return (
    <div>
      <button onClick={()=> router.push("/cevents")} className="bg-black border border-blue-600 text-white w-[300px] h-[50px] mt-[20px] rounded-md hover:cursor-pointer">
        Create Event
      </button>
    </div>
  );
}
