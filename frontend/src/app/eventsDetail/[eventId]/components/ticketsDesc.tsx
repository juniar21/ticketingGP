"use client";
// import CreateOrderForm from "@/app/components/order/orderForm";
import axios from "@/lib/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import TicketSelection from "./modalTicket";

interface Ticket {
  id: number;
  category: string;
  price: number;
  quota: number;
}
export default function TicketDetails() {
  const { eventId } = useParams();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axios.get(`/tickets/${eventId}`);
        setTickets(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [eventId]);

  if (loading)
    return (
      <div>
        <p>Fetching Tickets...</p>
      </div>
    );
  if (!tickets)
    return (
      <div>
        <p className="text-red-500">Tickets Not Found or Not been Created!</p>
      </div>
    );
  return (
    <div>
      {tickets.length === 0 ? (
        <p className="text-red-500 font-bold">
          Ticket not Available or Not Created Yet!
        </p>
      ) : (
        <ul className="w-[250px] flex flex-col gap-3">
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              onClick={() => handleTicketSelect(ticket)}
              className="border border-black bg-white shadow-md/50 cursor-pointer p-2"
            >
              <p className="font-bold text-[25px]">{ticket.category} PASS</p>
              <p>Price : {ticket.price}</p>
              <p>Quota : {ticket.quota}</p>
            </li>
          ))}
        </ul>
      )}
      {selectedTicket && <TicketSelection selectedTicket={selectedTicket} />}
    </div>
  );
}
