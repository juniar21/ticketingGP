"use client";

import axios from "@/lib/axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  category: string;
  location: string;
  circuit: string;
  date: string;
  startTime: string;
  endTime: string;
  image: string;
}
export default function EventsDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Gagal mengambil data event atau tiket:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [eventId]);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <p className="font-bold text-[100px]">Fetching Data...</p>
      </div>
    );
  if (!event)
    return (
      <div className="flex justify-center items-center">
        <p className="font-bold text-[100px] text-red-500">Event Not Found</p>
      </div>
    );

  return (
    <div>
      <Image
        className="object-cover w-[800px] rounded-t-md h-[300px]"
        src={event.image}
        alt="eventimage"
        width={1000}
        height={100}
      />
      <div className="p-5">
        <p>Nama Event</p>
        <div className="w-[750px] h-[30px] mt-1 px-1 bg-slate-300 rounded-md shadow-md/40">
          {event.title}
        </div>
        <p className="mt-1">Category Event</p>
        <div className="w-[750px] h-[30px] mt-1 px-1 bg-slate-300 rounded-md shadow-md/40">
          {event.category}
        </div>
        <p className="mt-1">Location</p>
        <div className="w-[750px] h-[30px] mt-1 px-1 bg-slate-300 rounded-md shadow-md/40">
          {event.location}
        </div>
        <p className="mt-1">Circuit</p>
        <div className="w-[750px] h-[30px] mt-1 px-1 bg-slate-300 rounded-md shadow-md/40">
          {event.circuit}
        </div>
        <p className="mt-1">Date</p>
        <div className="w-[750px] h-[30px] mt-1 px-1 bg-slate-300 rounded-md shadow-md/40">
          {event.date}
        </div>
        <div className="w-[750px] h-[30px] mt-1 px-1 bg-slate-300 rounded-md shadow-md/40">
          Start :{event.startTime}
        </div>
        <div className="w-[750px] h-[30px] mt-1 px-1 bg-slate-300 rounded-md shadow-md/40">
          End :{event.endTime}
        </div>
      </div>
    </div>
  );
}
