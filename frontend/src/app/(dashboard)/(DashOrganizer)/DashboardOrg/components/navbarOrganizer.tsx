"use client";

import GesturesButtonDash from "@/app/anim/gesturesDashboard";

import { useRouter } from "next/navigation";

export default function NavOrganizer() {
  const router = useRouter();
  return (
    <div className="w-[400px] h-screen bg-black flex flex-col gap-3 p-5 items-center">
      <GesturesButtonDash>
        <button
          onClick={() => router.push("/DashboardOrg")}
          className=" w-[300px] h-[80px] bg-slate-900 text-white text-[20px] rounded-md border border-blue-500 hover:cursor-pointer"
        >
          PROFILE
        </button>
      </GesturesButtonDash>
      <GesturesButtonDash>
        <button
          onClick={() => router.push("/eventsOrg")}
          className="w-[300px] h-[80px] bg-slate-900 text-white text-[20px] rounded-md border border-blue-500 hover:cursor-pointer"
        >
          EVENTS
        </button>
      </GesturesButtonDash>
      <GesturesButtonDash>
        <button className="w-[300px] h-[80px] bg-slate-900 text-white text-[20px] rounded-md border border-blue-500 hover:cursor-pointer">
          STATISTIK
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
