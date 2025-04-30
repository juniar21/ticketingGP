import NavOrganizer from "../../(dashboard)/(DashOrganizer)/DashboardOrg/components/navbarOrganizer";
import CreateTicketForm from "../../cevents/components/tickets";
import NavbarPage from "../../components/navbar/navbar";

export default function TicketEventsCreate() {
  return (
    <div>
      <NavbarPage />
      <div className="flex gap-5">
        <NavOrganizer />
        <CreateTicketForm />
      </div>
    </div>
  );
}
