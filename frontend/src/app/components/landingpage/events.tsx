"use client";
import { useState } from "react";
import Image from "next/image";
import DropdownMenu from "./dropmenu";

interface Event {
  name: string;
  date: string;
  category: string;
  image: string;
}

export default function EventGP() {
  const events: Event[] = [
    {
      name: "BALI GP",
      date: "10-02",
      category: "GP Events",
      image:
        "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744453192/gpjakarta_tklbgd.jpg",
    },
    {
      name: "Jakarta GP",
      date: "08-05",
      category: "GP Events",
      image:
        "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744453138/gpbali_tktpfk.jpg",
    },
    {
      name: "Bandung RoadRace",
      date: "05-10",
      category: "RoadRace Events",
      image:
        "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744453138/gpbali_tktpfk.jpg",
    },
    {
      name: "Purwadhika GP",
      date: "15-12",
      category: "GP Events",
      image:
        "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744453138/gpbali_tktpfk.jpg",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("All Events");

  const filterEvents = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredEvents =
    selectedCategory === "All Events"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <div>
      <DropdownMenu onCategorySelect={filterEvents} />
      <h1 className="font-audio text-[50px] ml-[40px] font-bold">{selectedCategory}</h1>
      <div className="mt-[30px] flex flex-col items-center">
        <div className="flex gap-10 justify-center flex-wrap">
          {filteredEvents.map((event, idx) => (
            <div
              key={idx}
              className="bg-white w-[300px] h-[400px] shadow-md/30 flex flex-col rounded-md hover:scale-110"
            >
              <Image
                className="rounded-t-md"
                src={event.image}
                alt={event.name}
                width={300}
                height={100}
              />
              <div className="flex flex-col items-center justify-center">
                <p className="text-[25px] text-black font-audio font-bold">
                  {event.name}
                </p>
                <p className="text-red-500 font-bold font-audio">
                  {event.date}
                </p>
                <button className="subpixel-antialiased font-extralight bg-red-500 w-[200px] h-[50px] rounded-4xl shadow-md/50 hover:bg-red-300 hover:cursor-pointer">
                  Buy Now
                </button>
                <button className="mt-[10px] subpixel-antialiased font-extralight bg-slate-300 w-[200px] h-[50px] rounded-4xl shadow-md/50 hover:bg-amber-300 hover:cursor-pointer">
                  VIP Pass
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
