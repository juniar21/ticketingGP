"use client";
import GesturesButton from "@/app/anim/gestures";
import { useSession } from "next-auth/react";
import * as motion from "motion/react-client";

export default function ProfileDashboard() {
  const { data: session } = useSession();
  return (
    <div>
      <div className="w-[800px] h-[600px] bg-slate-900 rounded-md mt-[50px] text-white p-5">
        <p className="text-[35px] font-bold">Hello {session?.user?.fullname}!</p>
        <p className="text-[20px]">You are here as {session?.user?.role}</p>
        <p className="text-[25px]">Username</p>
        <p className="font-extralight text-[20px] border border-blue-500 p-2 rounded-md">
          {" "}
          {session?.user?.username}
        </p>
        <p className="text-bold text-[25px]">Fullname</p>
        <p className="font-extralight text-[20px] border border-blue-500 p-2 rounded-md">
          {" "}
          {session?.user?.fullname}
        </p>
        <p className="text-bold text-[25px]">Email</p>
        <p className="font-extralight text-[20px] border border-blue-500 p-2 rounded-md">
          {" "}
          {session?.user?.email}
        </p>
        <p className="text-bold text-[25px]">Refferal Code</p>
        <p className="font-extralight text-[20px] border border-blue-500 p-2 rounded-md">
          {" "}
          {session?.user?.refferal}
        </p>
        <div className="mt-[30px]">
          <motion.div className="w-[200px]"
            initial={{ backgroundColor: "#050505" }}
            whileHover={{ scale: 1.1, backgroundColor: "#0a2381" }}
            whileTap={{ scale: 0.8 }}
            transition={{
              duration: 0.1,
              ease: "easeInOut",
            }}
          >
            <button className="text-bold text-[25px] w-[200px] h-[80px] bg-black border border-blue-500 rounded-md cursor-pointer">
              Update Profile
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
