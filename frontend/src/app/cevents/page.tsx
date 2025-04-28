"use client";
import NavOrganizer from "../(dashboard)/(DashOrganizer)/DashboardOrg/components/navbarOrganizer";
import NavbarPage from "../components/navbar/navbar";
import CreateForm from "./components/forms";
import TicketEvents from "./components/tickets";

export default function Create() {
  return (
    <div>
      <NavbarPage />
      <div className="flex gap-5">
        <NavOrganizer />
        <CreateForm />
        <TicketEvents/>
      </div>
    </div>
  );
}
