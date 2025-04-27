"use client";
import { useState } from "react";
import Image from "next/image";
import DropdownMenu from "./categorydrop";
import AnimasiPopScroll from "@/app/anim/popscroll";
import AnimasiTransition from "@/app/anim/transition";
import { useRouter } from "next/navigation";
//import { useSession } from "next-auth/react";
//import axios from "@/lib/axios";


interface Event {
  id: number;
  name: string;
  date: string;
  category: string;
  image: string;
}

export default function EventGP() {
  const router = useRouter();
  //const { data } = useSession();
  const events1: Event[] = [
    {
      id: 1,
      name: "BALI GP",
      date: "10-02",
      category: "GP Events",
      image:
        "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744453192/gpjakarta_tklbgd.jpg",
    },
    {
      id: 2,
      name: "Jakarta GP",
      date: "08-05",
      category: "GP Events",
      image:
        "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744453138/gpbali_tktpfk.jpg",
    },
    {
      id: 3,
      name: "Bandung RoadRace",
      date: "05-10",
      category: "RoadRace Events",
      image:
        "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744453138/gpbali_tktpfk.jpg",
    },
    {
      id: 4,
      name: "Purwadhika GP",
      date: "15-12",
      category: "GP Events",
      image:
        "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744453138/gpbali_tktpfk.jpg",
    },
  ];
  // const { data1 } = await axios.get("/getAllEve",{
  //   headers: {
  //     Authorization: `Bearer ${data?.accessToken}`,
  //   },
  // });
  // const events2: Event[] = data1.events2;
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Events");

  const filterEvents = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredEvents =
    selectedCategory === "All Events"
      ? events1
      : events1.filter((event) => event.category === selectedCategory);

  return (
    <div>
      <div
        role="flex category & judul category"
        className="flex justify-between px-[90px]"
      >
        <h1 className="text-[30px] text-white sm:text-[40px] md:text-[50px] font-bold">
          {selectedCategory}
        </h1>
        <DropdownMenu onCategorySelect={filterEvents} />
      </div>

      <div className="mt-[30px] flex flex-col items-center">
        <AnimasiTransition>
          <div className="flex gap-5 sm:gap-10 justify-center flex-wrap">
            {filteredEvents.map((event, idx) => (
              <div
                key={idx}
                className="bg-black w-[100%] sm:w-[300px] h-[400px] shadow-md/30 flex flex-col rounded-md hover:scale-110 mb-5 sm:mb-0"
              >
                {/* Image Fix */}
                <AnimasiPopScroll>
                  <div className="relative w-full h-[200px] sm:h-[200px]">
                    <Image
                      className="rounded-t-md object-cover"
                      src={event.image}
                      alt={event.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-[20px] sm:text-[25px] text-white font-audio font-bold">
                      {event.name}
                    </p>
                    <p className="text-yellow-300 font-bold font-audio">
                      {event.date}
                    </p>
                    <button onClick={()=> router.push(`/tdetail/${event.id}`) } className="subpixel-antialiased font-extralight font-audio bg-blue-600/25 border border-sky-500 text-white w-[220px] sm:w-[250px] h-[60px] rounded-4xl shadow-md/50 hover:bg-sky-300/45 hover:cursor-pointer mt-4 sm:mt-6">
                      Details
                    </button>
                  </div>
                </AnimasiPopScroll>
              </div>
            ))}
          </div>
        </AnimasiTransition>
      </div>
    </div>
  );
}
