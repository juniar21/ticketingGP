import NavbarPage from "@/app/components/navbar/navbar";
import Orders from "./components/orders";
import NavOrganizer from "../DashboardOrg/components/navbarOrganizer";

export default function OrderHistory() {
  return (
    <div>
      <NavbarPage />
      <div className="flex gap-[150px]">
        <NavOrganizer />
        <div>
          <div className="mt-[50px] w-[800px] h-[500px] bg-sky-950 rounded-md">
            <p className="text-[30px] text-white font-bold subpixel-antialiased ml-[20px]">
              Orders History
            </p>
            <Orders/>
            
          </div>
        </div>
      </div>
    </div>
  );
}
