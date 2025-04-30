"use client";
import GesturesButton from "@/app/anim/gestures";
import axios from "@/lib/axios";
import { IEvent, IOrder } from "@/types/typemodel";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Details() {
  const router = useRouter();
  const { data } = useSession();
    //const { datas } = useSession();
    const [event1, setEvents] = useState<IEvent[]>([]); 
    const { data: session } = useSession();
    const onGet = async () => {
    try {
      const {data} = await axios.get("/events/getEveTic",{
        // headers: {
        //   Authorization: `Bearer ${datas?.accessToken}`,
        // },
      });
      const event: IEvent[] = data.event1;
      console.log(event);
      
      setEvents(event)
    } catch (err) {
      console.log(err);
      }
    }
    //dibuatin tombol agar onCreateOrder agar mentrigger
    const onCreateOrder = async () => {
      try {
        const [orders, setOrders] = useState<IOrder[]>([]);
        const [ticketId, setTicketId] = useState<string>("");
        const [quantity, setQuantity] = useState<number>(1);
        const [amount, setAmount] = useState<number>(0);

        const body = {
          ticketId,
          quantity,
          amount,
        };
  
        const response = await axios.post("/orders", body, {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`, // kalau perlu token
          },
        });
  
        console.log("Order created:", response.data);
  
        // Simpan order yang baru dibuat ke state
        setOrders((prev) => [...prev, response.data]); 
      } catch (err) {
        console.log("Error create order:", err);
      }
    };


     // const filteredEvents =
    //   selectedCategory === "All Events"
    //     ? events
    //     : events.filter((events) => events.category === selectedCategory);
    
    useEffect(() => {
      onGet();
        }, []);

  const events = {
    name: "BALI GP",
    date: "10-02",
    start: "08:00 AM",
    end: "12:00 PM",
    location: "Denpasar, Bali",
    circuit: "Denpasar Racing",
    category: "GP Events",
    image:
      "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744453192/gpjakarta_tklbgd.jpg",
    priceRegular: 250000,
    priceVIP: 500000,
  };
  const [activeTab, setActiveTab] = useState("description");
  // State for keeping track of the number of tickets
  const [ticketCount, setTicketCount] = useState(0);
  const [ticketCountVIP, setTicketCountVIP] = useState(0);

  // increment Reguler
  const increment = () => {
    setTicketCount(ticketCount + 1);
  };

  // decrement Reguler
  const decrement = () => {
    if (ticketCount >= 1) {
      setTicketCount(ticketCount - 1);
    }
  };
  // increment VIP
  const incrementVIP = () => {
    setTicketCountVIP(ticketCountVIP + 1);
  };

  // decrement VIP
  const decrementVIP = () => {
    if (ticketCount >= 0) {
      setTicketCountVIP(ticketCountVIP - 1);
    }
  };
  const totalReg = ticketCount;
  const totalRegPrice = ticketCount * 250000;
  const totalVIP = ticketCountVIP;
  const totalVIPPrice = ticketCountVIP * 500000;
  const totalTicket = totalRegPrice + totalVIPPrice;
  return (
    <div className="flex justify-center gap-10 mt-[20px]">
      <div className="w-[800px] h-[1000px] bg-black text-white rounded-md">
        <div className="flex flex-col items-center gap-5 justify-center">
          <p className="font-bold text-[50px]">{events.name}</p>
          <Image
            className="rounded-md"
            src={events.image}
            alt="eventsimage"
            width={500}
            height={500}
          />
          <div className="flex">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-2 px-4 text-sm font-medium rounded-tl-md w-[350px] ${
                activeTab === "description"
                  ? "text-white bg-blue-600"
                  : "text-white bg-gray-700 hover:bg-blue-500 hover:cursor-pointer"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("tickets")}
              className={`py-2 px-4 text-sm font-medium rounded-tr-md w-[350px] ${
                activeTab === "tickets"
                  ? "text-white bg-blue-600"
                  : "text-white bg-gray-700 hover:bg-blue-500 hover:cursor-pointer"
              }`}
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
                  {events.category}
                </p>
                <p className="mt-[10px] font-bold text-[20px]">Start Time</p>
                <p className="w-[650px] h-[30px] bg-gray-800 rounded-md mt-[10px]">
                  {events.start}
                </p>
                <p className="mt-[10px] font-bold text-[20px]"> End Time</p>
                <p className="w-[650px] h-[30px] bg-gray-800 rounded-md mt-[10px]">
                  {events.end}
                </p>
                <p className="mt-[10px] font-bold text-[20px]"> Date</p>
                <p className="w-[650px] h-[30px] bg-gray-800 rounded-md mt-[10px]">
                  {events.date}
                </p>
                <p className="mt-[10px] font-bold text-[20px]"> Location</p>
                <p className="w-[650px] h-[30px] bg-gray-800 rounded-md mt-[10px]">
                  {events.location}
                </p>
                <p className="mt-[10px] font-bold text-[20px]"> Circuit</p>
                <p className="w-[650px] h-[30px] bg-gray-800 rounded-md mt-[10px]">
                  {events.circuit}
                </p>
              </div>
            </div>
          ) : (
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
                        this pass only available for {events.name}
                      </p>
                    </div>
                    <div>
                      <p className="font-extrabold text-[25px] text-sky-300">
                        {events.circuit}
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
                        Available Seat : 100
                      </p>
                      <div className="flex gap-2">
                        <p className="text-[25px] subpixel-antialiased font-extralight">
                          Price :
                        </p>
                        <p className="text-[25px] subpixel-antialiased font-bold">
                          IDR {events.priceRegular}
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
                <div className="rounded-t-md mt-[20px] bg-black w-[650px] h-[70px]">
                  <div className="flex items-center gap-[100px]">
                    <div className="flex flex-col">
                      <div className="flex gap-2 text-[30px] px-3 text-red-500">
                        <p className="font-bold">VIP</p>
                        <p>PASS</p>
                      </div>
                      <p className="px-3 text-red-400">
                        this pass only available for {events.name}
                      </p>
                    </div>
                    <div>
                      <p className="font-extrabold text-[25px] text-red-500">
                        {events.circuit}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-950 rounded-b-md w-[650px] h-[125px] px-3">
                  <div className="flex gap-3">
                    <div className="w-[325px] h-[110px] border-r-2 border-red-300 text-red-800">
                      <p className="text-[25px] subpixel-antialiased font-extralight">
                        VIP Stand
                      </p>
                      <p className="text-[25px] subpixel-antialiased font-extralight">
                        Available Seat : 100
                      </p>
                      <div className="flex gap-2">
                        <p className="text-[25px] subpixel-antialiased font-extralight">
                          Price :
                        </p>
                        <p className="text-[25px] subpixel-antialiased font-bold">
                          IDR {events.priceVIP}
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
      <div>
        <div className="w-[300px] h-[300px] bg-black border border-blue-500 rounded-md sticky top-25 text-white">
          <div className="flex flex-col items-center mt-[20px] gap-3">
            <div className="w-[250px] h-[50px] bg-slate-900 rounded-md px-3">
              <p>Regular Pass : {totalReg}</p>
              <p>Price Regular : {totalRegPrice}</p>
            </div>
            <div className="w-[250px] h-[50px] bg-slate-900 rounded-md px-3">
              <p>VIP Pass : {totalVIP}</p>
              <p>Price VIP : {totalVIPPrice}</p>
            </div>
            <div className="w-[250px] h-[50px] bg-slate-900 rounded-md p-3">
              <p>Total Price : {totalTicket}</p>
            </div>
            <GesturesButton>
              <button
                onClick={() => router.push("/payments")}
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
