"use client";
import EventGP from "./events";
import NavbarPage from "../navbar/navbar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LandingSearch from "./search";
import GesturesButton from "@/app/anim/gestures";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="relative">
      <NavbarPage />
      <div role="image" className="absolute z-0">
        <Image
          className="w-screen object-cover h-[450px]"
          src={
            "https://res.cloudinary.com/dtsxir6lv/image/upload/v1745220492/download_psaf0b.jpg"
          }
          alt="image"
          width={2080}
          height={100}
        />
      </div>
      <div role="flex" className="flex justify-center mt-[100px] gap-[50px]">
        <div
          role="Card"
          className="w-[700px] h-[250px] bg-black/60 relative z-10 rounded-xl"
        >
          <div className="flex flex-col pt-[20px] gap-5 justify-center items-center relative z-10 p-5">
            <p className="text-white text-[35px]  font-bold">
              ARE YOU AN ORGANIZER?
            </p>
            <p className="text-white text-[20px]">
              Be an organizer to be the one who make the race. Make a gratefull,
              exclusive, or fantastic evolution of events
            </p>
            <GesturesButton>
              <button
                onClick={() => router.push("/cevents")}
                className="bg-black/50 border border-blue-500 text-white text-[25px] w-[250px] h-[50px] shadow-md/35 rounded-md hover:cursor-pointer"
              >
                CREATE EVENTS
              </button>
            </GesturesButton>
          </div>
        </div>
        <div
          role="Card"
          className="w-[280px] h-[250px] bg-blue-950/60 rounded-md relative z-10"
        >
          <div className="flex flex-col pt-[20px] gap-5 justify-center font-bold relative z-10 text-white p-5">
            <p className="text-[40px]">EARN MORE</p>
            <p className="font-extralight text-[20px]">
              Use REFFERAL CODE to get bonuses & discount on every order on
              ticket or events
            </p>
          </div>
        </div>
      </div>
      <div className="mt-[50px] flex justify-center">
        <LandingSearch />
      </div>
      <div className="flex justify-center gap-5 sm:mt-12 md:mt-16 px-4 sm:px-6 lg:px-10 relative">
        <div
          role="card"
          className="mt-[50px] w-full sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[80%] 2xl:w-[60%] h-[100%] bg-black/45 rounded-md shadow-md/20"
        >
          <EventGP />
        </div>
      </div>
    </div>
  );
}
