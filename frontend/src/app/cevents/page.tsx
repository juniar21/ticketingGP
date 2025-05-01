"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NavOrganizer from "../(dashboard)/(DashOrganizer)/DashboardOrg/components/navbarOrganizer";
import NavbarPage from "../components/navbar/navbar";
import CreateForm from "./components/forms";
import { toast } from "react-toastify";

export default function TicketPage() {
  const { data: session, status } = useSession();
  const router = useRouter();


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

  return (
    <div>
      <NavbarPage />
      <div className="flex gap-5">
        <NavOrganizer />
        <CreateForm />
      </div>
    </div>
  );
}
