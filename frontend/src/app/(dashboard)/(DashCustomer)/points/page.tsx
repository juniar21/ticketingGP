import NavbarPage from "@/app/components/navbar/navbar";
import NavCustomer from "../DashCustomer/components/navbarcust";
import RewardsPage from "./components/getPoints";


export default function Point() {
    return (
        <div>
             <NavbarPage />
                  <div className="flex gap-[150px]">
                    <NavCustomer />
                    <div>
                      <div className="mt-[50px] w-[800px] h-[500px] bg-sky-950 rounded-md">
                        <p className="text-[30px] text-white font-bold subpixel-antialiased ml-[20px]">
                          My Points
                        </p>
                        <RewardsPage />
                        
                      </div>
                    </div>
                  </div>
        </div>
    )
}