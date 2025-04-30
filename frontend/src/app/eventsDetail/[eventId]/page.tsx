import NavbarPage from "@/app/components/navbar/navbar";
import EventsDetail from "./components/eventsDesc";
import TicketDetails from "./components/ticketsDesc";

export default function EventsDetailPage() {
  return (
    <div>
      <NavbarPage />
      <div className="flex gap-5">
        <div className="mt-5 ml-5 w-[800px] h-[700px] bg-white border border-black rounded-md shadow-md/60">
          <EventsDetail />
        </div>
        <div className="mt-5 w-[300px] p-5 bg-white border border-black rounded-md shadow-md/60">
          <TicketDetails />
        </div>
      </div>
    </div>
  );
}
