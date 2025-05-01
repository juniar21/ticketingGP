"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import TicketForm from "../ticketForm/components/ticketForm";
import { toast } from "react-toastify";

export default function TicketPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const eventId = Number(params.eventId);

  // Redirect jika tidak login atau bukan organizer
  useEffect(() => {
    if (status === "authenticated") {
      const userRole = session?.user?.role;
      if (userRole !== "PROMOTOR") {
        router.push("/login"); // Atau tampilkan pesan akses ditolak
        toast.error("You are not Promotor"); 
      }
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (isNaN(eventId)) {
    return <div>Invalid event ID</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <TicketForm eventId={eventId} />
    </div>
  );
}
