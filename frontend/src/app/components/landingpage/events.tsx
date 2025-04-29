"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import DropdownMenu from "./categorydrop";
import AnimasiPopScroll from "@/app/anim/popscroll";
import AnimasiTransition from "@/app/anim/transition";
import { useRouter } from "next/navigation";
import { IEvent } from "@/types/typemodel";
//import { useSession } from "next-auth/react";
import axios from "@/lib/axios";


export default function EventGP() {
  const router = useRouter();
  //const { datas } = useSession();
  const [events, setEvents] = useState<IEvent[]>([]); 
  
  const onGet = async () => {
  try {
    const {data} = await axios.get("/events/getAllEve",{
      // headers: {
      //   Authorization: `Bearer ${datas?.accessToken}`,
      // },
    });
    const event: IEvent[] = data.events;
    console.log(event);
    
    setEvents(event)
  } catch (err) {
    console.log(err);
    }
  }
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Events");

  const filterEvents = (category: string) => {
    setSelectedCategory(category);
  };

  // const filteredEvents =
  //   selectedCategory === "All Events"
  //     ? events
  //     : events.filter((events) => events.category === selectedCategory);
  
  useEffect(() => {
    onGet();
      }, []);

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
            {events.map((event, idx) => (
              <div
                key={idx}
                className="bg-black w-[100%] sm:w-[300px] h-[400px] shadow-md/30 flex flex-col rounded-md hover:scale-110 mb-5 sm:mb-0"
              >
                {/* Image Fix */}
                <AnimasiPopScroll>
                  <div className="relative w-full h-[200px] sm:h-[200px]">
                    <Image
                      className="rounded-t-md object-cover"
                      src={event.image ||  "https://res.cloudinary.com/dtsxir6lv/image/upload/v1745220492/download_psaf0b.jpg"
                      }
                      alt={event.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-[20px] sm:text-[25px] text-white font-audio font-bold">
                      {event.circuit}
                    </p>
                    <p className="text-yellow-300 font-bold font-audio">
                    {new Date(event.date).toLocaleString()}
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
