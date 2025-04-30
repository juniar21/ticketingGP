"use client";
import GesturesButton from "@/app/anim/gestures";
import axios from "@/lib/axios";
import { IEvent } from "@/types/typemodel";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Details() {
  const router = useRouter();
  const { data } = useSession(); // Get session data for authentication token
  const [events, setEvents] = useState<IEvent | null>(null); // Event state to store event details
  const [ticketCount, setTicketCount] = useState(0); // Regular ticket count state
  const [ticketCountVIP, setTicketCountVIP] = useState(0); // VIP ticket count state
  const [activeTab, setActiveTab] = useState("description"); // Active tab state
  const params = useParams()
  const id = params?.id as string

  // Function to fetch event data from backend
  const onGet = async () => {
    try {
      const res  = await axios.get(`/events/getEveTic?id=${id}`, {
        // headers: {
        //   Authorization: `Bearer ${data?.accessToken}`,
        // },
      });
      // console.log(res.data.data[0]);
    
      const tickets = res.data.data[0].tickets

      console.log(tickets)
    
      const event = res.data.data[0];
      setEvents(event);
    } catch (err) {
      console.log("Error fetching events:", err);
    }
  };

  // Fetch event data on component mount
  useEffect(() => {
    onGet();
  }, []);



  // Function to create an order (with ticket and price details)
  const onCreateOrder = async (ticketId: string, quantity: number, amount: number) => {
    try {
      const body = {
        ticketId,
        quantity,
        amount,
      };

      const response = await axios.post("/orders", body, {
        headers: {
          Authorization: `Bearer ${data?.accessToken}`,
        },
      });

      console.log("Order created:", response.data);
    } catch (err) {
      console.log("Error creating order:", err);
    }
  };

  // Ticket count manipulation functions
  const increment = () => {
    setTicketCount(ticketCount + 1);
  };

  const decrement = () => {
    if (ticketCount >= 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  const incrementVIP = () => {
    setTicketCountVIP(ticketCountVIP + 1);
  };

  const decrementVIP = () => {
    if (ticketCountVIP >= 1) {
      setTicketCountVIP(ticketCountVIP - 1);
    }
  };

  // Calculate total price for regular and VIP tickets
  const totalRegPrice = ticketCount * (events?.tickets[1]?.price ?? 0);
  const totalVIPPrice = ticketCountVIP * (events?.tickets[0]?.price ?? 0) ;
  const totalTicket = totalRegPrice + totalVIPPrice;

  return (
    <div className="flex justify-center gap-10 mt-[20px]">
      <div className="w-[800px] h-[1000px] bg-black text-white rounded-md">
        <div className="flex flex-col items-center gap-5 justify-center">
          <p className="font-bold text-[50px]">{events?.title || ''}</p>
          <Image
            className="rounded-md"
            src={events?.image || "/default-image.png"}
            alt="eventsimage"
            width={500}
            height={500}
          />
          <div className="flex">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-2 px-4 text-sm font-medium rounded-tl-md w-[350px] ${activeTab === "description" ? "text-white bg-blue-600" : "text-white bg-gray-700 hover:bg-blue-500"}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("tickets")}
              className={`py-2 px-4 text-sm font-medium rounded-tr-md w-[350px] ${activeTab === "tickets" ? "text-white bg-blue-600" : "text-white bg-gray-700 hover:bg-blue-500"}`}
            >
              Tickets
            </button>
          </div>
        </div>
        <div>
          {activeTab === "description" ? (
            <div className="flex flex-col items-center justify-center">
              <div className="w-[700px] h-[500px] bg-slate-900 rounded-b-md px-5">
                <p className="font-bold text-[20px]">Category</p>
                <p className="w-[650px] h-[30px] bg-gray-800 rounded-md mt-[10px]">
                  {events?.category}
                </p>
                <p className="mt-[10px] font-bold text-[20px]">Start Time</p>
                <p className="w-[650px] h-[30px] bg-gray-800 rounded-md mt-[10px]">
                  {events?.startTime}
                </p>
                <p className="mt-[10px] font-bold text-[20px]"> End Time</p>
                <p className="w-[650px] h-[30px] bg-gray-800 rounded-md mt-[10px]">
                  {events?.endTime}
                </p>
                <p className="mt-[10px] font-bold text-[20px]"> Date</p>
                <p className="w-[650px] h-[30px] bg-gray-800 rounded-md mt-[10px]">
                  {events?.date}
                </p>
                <p className="mt-[10px] font-bold text-[20px]"> Location</p>
                <p className="w-[650px] h-[30px] bg-gray-800 rounded-md mt-[10px]">
                  {events?.location}
                </p>
                <p className="mt-[10px] font-bold text-[20px]"> Circuit</p>
                <p className="w-[650px] h-[30px] bg-gray-800 rounded-md mt-[10px]">
                  {events?.circuit}
                </p>
              </div>
            </div>
          ) : (
            // Tickets section
            <div className="flex flex-col items-center justify-center">
              <div className="w-[700px] h-[500px] bg-slate-900 rounded-b-md px-5">
                <div className="rounded-t-md mt-[20px] bg-blue-950 w-[650px] h-[70px]">
                  <div className="flex items-center gap-[100px]">
                    <div className="flex flex-col">
                      <div className="flex gap-2 text-[30px] px-3 text-sky-200">
                        <p className="font-bold">REGULAR</p>
                        <p>PASS</p>
                      </div>
                      <p className="px-3 text-sky-200">
                        this pass only available for {events?.title}
                      </p>
                    </div>
                    <div>
                      <p className="font-extrabold text-[25px] text-sky-300">
                        {events?.circuit}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-indigo-950 rounded-b-md w-[650px] h-[125px] px-3">
                  <div className="flex gap-3">
                    <div className="w-[325px] h-[110px] border-r-2 border-blue-300">
                      <p className="text-[25px] subpixel-antialiased font-extralight">
                        Regular Stand
                      </p>
                      <p className="text-[25px] subpixel-antialiased font-extralight">
                        Available Seat : {events?.tickets[1].quota}
                      </p>
                      <div className="flex gap-2">
                        <p className="text-[25px] subpixel-antialiased font-extralight">
                          Price :
                        </p>
                        <p className="text-[25px] subpixel-antialiased font-bold">
                          IDR {events?.tickets[1]?.price || 0}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center ml-[50px]">
                      <GesturesButton>
                        <button
                          onClick={decrement}
                          className="w-[50px] h-[50px] bg-blue-950 rounded-md text-white border border-blue-400 hover:cursor-pointer"
                        >
                          -
                        </button>
                      </GesturesButton>
                      <p>{ticketCount}</p>
                      <GesturesButton>
                        <button
                          onClick={increment}
                          className="w-[50px] h-[50px] bg-blue-950 rounded-md text-white border border-blue-400 hover:cursor-pointer"
                        >
                          +
                        </button>
                      </GesturesButton>
                    </div>
                  </div>
                </div>

                {/* VIP Ticket Section */}
                
                <div className="bg-gray-950 rounded-b-md w-[650px] h-[125px] px-3">
                  <div className="flex gap-3">
                    <div className="w-[325px] h-[110px] border-r-2 border-red-300 text-red-800">
                      <p className="text-[25px] subpixel-antialiased font-extralight">
                        VIP Stand
                      </p>
                      <p className="text-[25px] subpixel-antialiased font-extralight">
                        Available Seat : {events?.tickets[0].quota}
                      </p>
                      <div className="flex gap-2">
                        <p className="text-[25px] subpixel-antialiased font-extralight">
                          Price :
                        </p>
                        <p className="text-[25px] subpixel-antialiased font-bold">
                          IDR {events?.tickets[0]?.price || 0}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center ml-[50px]">
                      <GesturesButton>
                        <button
                          onClick={decrementVIP}
                          className="w-[50px] h-[50px] bg-black rounded-md text-white border border-red-500 hover:cursor-pointer"
                        >
                          -
                        </button>
                      </GesturesButton>
                      <p>{ticketCountVIP}</p>
                      <GesturesButton>
                        <button
                          onClick={incrementVIP}
                          className="w-[50px] h-[50px] bg-black rounded-md text-white border border-red-500 hover:cursor-pointer"
                        >
                          +
                        </button>
                      </GesturesButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <div className="w-[300px] h-[300px] bg-black border border-blue-500 rounded-md sticky top-25 text-white">
          <div className="flex flex-col items-center mt-[20px] gap-3">
            <div className="w-[250px] h-[50px] bg-slate-900 rounded-md px-3">
              <p>Regular Pass: {ticketCount}</p>
              <p>Price Regular: {totalRegPrice}</p>
            </div>
            <div className="w-[250px] h-[50px] bg-slate-900 rounded-md px-3">
              <p>VIP Pass: {ticketCountVIP}</p>
              <p>Price VIP: {totalVIPPrice}</p>
            </div>
            <div className="w-[250px] h-[50px] bg-slate-900 rounded-md p-3">
              <p>Total Price: {totalTicket}</p>
            </div>
            <GesturesButton>
              <button
                onClick={onCreateOrder}
                className="w-[250px] h-[50px] bg-green-700 rounded-md p-3 hover:cursor-pointer"
              >
                Payment
              </button>
            </GesturesButton>
          </div>
        </div>
      </div>
    </div>
  );
}
