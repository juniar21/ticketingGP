"use client";
import GesturesButton from "@/app/anim/gestures";
import { useRouter } from "next/navigation";

export default function RoleReg() {
  const router = useRouter();

  return (
    <div className="flex justify-center mt-[30px]">
      <div
        role="card"
        className="w-[500px] h-[250px] rounded-md bg-black shadow-md/30"
      >
        <div className="flex flex-col gap-3 items-center">
          <h1 className="subpixel-antialiased text-white text-[30px]">
            REGISTER AS
          </h1>
          <div className="flex flex-col gap-3 mt-[50px]">
            <GesturesButton>
              <button
                onClick={() => router.push("/customer")}
                className="font-audio w-[400px] h-[50px] shadow-md/50 bg-black border border-blue-900 text-white rounded-md hover:cursor-pointer hover:bg-blue-900/45"
              >
                CUSTOMER
              </button>
            </GesturesButton>
            <GesturesButton>
              <button
                onClick={() => router.push("/organizer")}
                className="font-audio w-[400px] h-[50px] shadow-md/50 bg-black border border-blue-900 text-white rounded-md hover:cursor-pointer hover:bg-blue-900/45"
              >
                ORGANIZER
              </button>
            </GesturesButton>
          </div>
        </div>
      </div>
    </div>
  );
}
