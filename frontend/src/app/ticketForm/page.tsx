"use client";

import { useParams } from "next/navigation";
import TicketForm from "./components/ticketForm";

export default function TicketPage() {
  const params = useParams();
  const eventId = Number(params.eventId); // pastikan jadi number

  if (isNaN(eventId)) return <div>Invalid event ID</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <TicketForm eventId={eventId} />
    </div>
  );
}