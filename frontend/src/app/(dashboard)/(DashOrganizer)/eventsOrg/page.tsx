import NavbarPage from "@/app/components/navbar/navbar";
import NavOrganizer from "../DashboardOrg/components/navbarOrganizer";
import TabComponent from "./components/eventslist";
import CEvents from "./components/cevents";

export default function EventsOrg() {
  return (
    <div>
      <NavbarPage />
      <div className="flex gap-5">
        <NavOrganizer />
        <div className="flex flex-col gap-5">
          <CEvents />
          <TabComponent />
        </div>
      </div>
    </div>
  );
}
