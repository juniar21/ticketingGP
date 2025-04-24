import NavbarPage from "@/app/components/navbar/navbar";
import NavOrganizer from "./components/navbarOrganizer";
import ProfileDashboard from "./components/profile";

export default function OrganizerDashboard() {
  return (
    <div>
      <NavbarPage />
      <div className="flex gap-[150px]">
        <NavOrganizer />
        <ProfileDashboard />
      </div>
    </div>
  );
}
