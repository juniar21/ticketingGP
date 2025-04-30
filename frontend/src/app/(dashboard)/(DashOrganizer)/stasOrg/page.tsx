import NavbarPage from "@/app/components/navbar/navbar";
import NavOrganizer from "../DashboardOrg/components/navbarOrganizer";
import StasDay from "./components/stastistikDay";
import StasMonth from "./components/statistikMon";
import StasYear from "./components/statistikYear";
import ChartData from "./components/chartData";

export default function EventsOrg() {
  return (
    <div>
      <NavbarPage />
      <div className="flex gap-[150px]">
        <NavOrganizer />
        <div className="flex flex-col">
          <p className="text-black text-2xl font-bold">
            Chart Data
          </p>
          <div>
            <ChartData />
          </div>
          <div className="grid xl:grid-cols-3 max-md:grid-cols-2 gap-10">
            <StasDay />
            <StasMonth />
            <StasYear />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
