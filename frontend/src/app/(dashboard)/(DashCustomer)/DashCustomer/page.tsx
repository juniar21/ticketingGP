import NavbarPage from "@/app/components/navbar/navbar";
import NavCustomer from "./components/navbarcust";
import ProfileCustomer from "./components/profilecustomer";

export default function CustomerDashboard() {
  return (
    <div>
      <NavbarPage />
      <div className="flex gap-[150px]">
        <NavCustomer />
        <ProfileCustomer />
      </div>
    </div>
  );
}
