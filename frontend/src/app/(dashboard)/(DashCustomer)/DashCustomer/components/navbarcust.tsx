"use client";

import GesturesButtonDash from "@/app/anim/gesturesDashboard";

import { useRouter } from "next/navigation";

export default function NavCustomer() {
  const router = useRouter();
  return (
    <div className="w-[400px] h-screen bg-black flex flex-col gap-3 p-5 items-center">
      <GesturesButtonDash>
        <button
          onClick={() => router.push("/DashCustomer")}
          className=" w-[300px] h-[80px] bg-slate-900 text-white text-[20px] rounded-md border border-blue-500 hover:cursor-pointer"
        >
          PROFILE
        </button>
      </GesturesButtonDash>
      <GesturesButtonDash>
        <button
          onClick={() => router.push("/points")}
          className=" w-[300px] h-[80px] bg-slate-900 text-white text-[20px] rounded-md border border-blue-500 hover:cursor-pointer"
        >
          MY POINTS
        </button>
      </GesturesButtonDash>

      <GesturesButtonDash>
        <button
          onClick={() => router.push("/order")}
          className="w-[300px] h-[80px] bg-slate-900 text-white text-[20px] rounded-md border border-blue-500 hover:cursor-pointer"
        >
          ORDER HISTORY
        </button>
      </GesturesButtonDash>

      <GesturesButtonDash>
        <button
          onClick={() => router.push("/")}
          className="w-[300px] h-[80px] bg-slate-900 text-white text-[20px] rounded-md border border-blue-500 hover:cursor-pointer"
        >
          BACK TO HOME
        </button>
      </GesturesButtonDash>
    </div>
  );
}
