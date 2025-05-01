"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import NavbarPage from "@/app/components/navbar/navbar";
import CreateOrderForm from "@/app/components/order/orderForm";
import NavOrganizer from "@/app/(dashboard)/(DashOrganizer)/DashboardOrg/components/navbarOrganizer";
// Pastikan ini sesuai dengan path komponen CreateOrderForm

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

interface Ticket {
  id: number;
  category: string;
  price: number;
  quota: number;
}

export default function EventDetailPage() {
  const router = useRouter();
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null); // Menyimpan tiket yang dipilih
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`/events/${eventId}`);
        setEvent(response.data);
        const ticketRes = await axios.get(`/tickets/${eventId}`);
        setTickets(ticketRes.data.data);
      } catch (error) {
        console.error("Gagal mengambil data event atau tiket:", error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchData();
  }, [eventId]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!event) return <p className="p-6 text-red-500">Event tidak ditemukan.</p>;

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };
  return (
    <div className="gap-5">
      <NavbarPage />
      <div className="flex gap-5">
        <NavOrganizer />
        <div>
          <div className="mt-5 p-6 max-w-4xl mx-auto gap-5 bg-white shadow-md/60 rounded-md">
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>

            <div className="mb-6">
              <p>
                <strong>Category:</strong> {event.category}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>Circuit: {event.circuit}</p>
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              <p>
                <strong>Time:</strong> {event.startTime} - {event.endTime}
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-3">Daftar Tiket</h2>
            {tickets.length === 0 ? (
              <p className="text-gray-500">Belum ada tiket tersedia.</p>
            ) : (
              <ul className="space-y-3">
                {tickets.map((ticket) => (
                  <li
                    key={ticket.id}
                    className="border p-4 rounded-md bg-gray-100 cursor-pointer"
                    onClick={() => handleTicketSelect(ticket)} // Pilih tiket
                  >
                    <p>
                      <strong>Kategori:</strong> {ticket.category}
                    </p>
                    <p>
                      <strong>Harga:</strong> Rp{ticket.price.toLocaleString()}
                    </p>
                    <p>
                      <strong>Kuota:</strong> {ticket.quota}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {selectedTicket && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold">
                  Pilih Tiket: {selectedTicket.category}
                </h3>
                <CreateOrderForm ticket={selectedTicket} />
              </div>
            )}

            <div className="flex justify-between">
              <button
                type="submit"
                onClick={() => router.push("/eventsOrg")}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 mt-10"
              >
                Back To Events
              </button>
              <button
                onClick={() => router.push(`/ticketis/${event.id}`)}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 mt-10 "
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
