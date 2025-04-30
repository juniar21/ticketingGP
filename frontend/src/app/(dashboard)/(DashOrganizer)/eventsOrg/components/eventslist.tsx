"use client";
import axios from "@/lib/axios";
import { IEvent } from "@/types/typemodel";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TabComponent() {
  const { data } = useSession();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const session = await axios.get("/events/getEve", {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        });
        console.log(session);
        const event: IEvent[] = session.data.data;
        console.log(event);
  
        setEvents(event);
      } catch (err) {
        console.error(err);
      }
    };
  
    if (data?.accessToken) {
      fetchEvents();
    }
  }, [data?.accessToken]);
  

  const today = new Date();

  const upcomingEvents = (events || []).filter(
    (event) => new Date(event.date) >= today
  );
  
  const endedEvents = (events || []).filter(
    (event) => new Date(event.date) < today
  );

  const renderEvents = (eventList: IEvent[]) => {
    if (eventList.length === 0) {
      return <p className="text-center text-blue">No events found</p>;
    }

    return (
      <div className="grid gap-4 mt-4">
        {eventList.map((event) => (
          <div key={event.id} className="p-4 border rounded-md bg-gray-800 text-white">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-sm">{new Date(event.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex gap-3 border-b">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`py-2 px-4 text-sm font-medium rounded-md ${
            activeTab === "upcoming"
              ? "text-white bg-blue-600"
              : "text-white bg-gray-900 hover:bg-blue-500 hover:cursor-pointer"
          }`}
        >
          Events Created
        </button>
        <button
          onClick={() => setActiveTab("ended")}
          className={`py-2 px-4 text-sm font-medium rounded-md ${
            activeTab === "ended"
              ? "text-white bg-blue-600"
              : "text-white bg-gray-900 hover:bg-blue-500 hover:cursor-pointer"
          }`}
        >
          Events Ended
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === "upcoming"
          ? renderEvents(upcomingEvents)
          : renderEvents(endedEvents)}
      </div>
    </div>
  );
};
