/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import NavbarPage from "@/app/components/navbar/navbar";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useParams } from "next/navigation";
import TicketForm from "@/app/ticketForm/components/ticketForm";

export default function TicketDetail() {
  const { eventId } = useParams(); // ambil eventId dari URL
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Gagal mengambil data event:", error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!event) return <p className="text-center mt-10">Event tidak ditemukan</p>;

  return (
    <div>
      <NavbarPage />
      <TicketForm eventId={event.id} />
    </div>
  );
}
