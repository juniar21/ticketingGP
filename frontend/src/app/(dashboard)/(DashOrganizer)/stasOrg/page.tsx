import NavbarPage from "@/app/components/navbar/navbar";
import NavOrganizer from "../DashboardOrg/components/navbarOrganizer";
import StasDay from "./components/stastistikDay";
import StasMonth from "./components/statistikMon";
import StasYear from "./components/statistikYear";

export default function EventsOrg() {
  return (
    <div>
         <NavbarPage />
         <div className="flex gap-[150px]">
           <NavOrganizer />
            <StasDay />
            <StasMonth />
            <StasYear />
         </div>
         <div>
         </div>
       </div>
  );
}