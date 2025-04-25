"use client";
import RoleReg from "@/app/(auth)/register/components/role";
import GesturesButton from "@/app/anim/gestures";
import AnimasiPop from "@/app/anim/pop";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import GesturesButtonProf from "@/app/anim/gesturesProf";
import PopModalProf from "@/app/anim/pop";

export default function NavbarPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State dashboard profile
  const [isProfOpen, setIsProfOpen] = useState(false);
  // Fungsi untuk modal register
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  //fungsi modal menu profile
  const toggleProf = () => {
    setIsProfOpen((prev) => !prev);
  };
  // Toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  // user login
  const { data: session } = useSession();

  return (
    <div className="h-[60px] sm:h-[70px] md:h-[80px] px-4 sm:px-6 lg:px-10 bg-black/30 sticky top-0 flex justify-between items-center z-20">
      <div className="flex items-center">
        <p onClick={()=> router.push("/")} className="hover:cursor-pointer text-blue-500 font-extrabold text-[30px]">GP.TIXET</p>
      </div>

      {/* mobile menu */}
      <div className="sm:hidden flex items-center">
        <button onClick={toggleMenu} className="text-xl">
          {isMenuOpen ? (
            <span className="text-red-500">&#10005;</span> // Close icon (X)
          ) : (
            <span className="text-red-500">&#9776;</span> // Hamburger icon (three lines)
          )}
        </button>
      </div>
      {/* Desktop Login */}
      {session ? (
        <div className="flex items-center gap-3">
          <h1 className="text-white text-[20px]">{session?.user?.username}</h1>
          <GesturesButton>
            <button
              onClick={toggleProf}
              className="bg-black/60 text-white border border-blue-500 rounded-md w-[100px] h-[40px] text-[18px] hover:cursor-pointer"
            >
              Menu
            </button>
          </GesturesButton>
        </div>
      ) : (
        <div className="hidden sm:flex gap-3 sm:gap-5">
          <GesturesButton>
            <div
              onClick={openModal}
              className="bg-black/35 border text-white border-blue-500 w-[100px] h-[40px] rounded-md flex justify-center items-center shadow-md hover:cursor-pointer"
            >
              Register
            </div>
          </GesturesButton>
          <GesturesButton>
            <div
              onClick={() => router.push("/login")}
              className="bg-black/35 border text-white border-blue-500 w-[100px] h-[40px] rounded-md flex justify-center items-center shadow-md hover:cursor-pointer"
            >
              Log In
            </div>
          </GesturesButton>
        </div>
      )}
      {/*modal profile*/}
      {isProfOpen && (
        <div className="fixed inset-y-0 right-0 top-[80px] flex flex-col items-center gap-3 justify-center bg-black/70 rounded-md shadow-md/50 w-[300px] h-[500px] p-5">
          <PopModalProf>
            <div className="flex flex-col gap-5">
              <GesturesButtonProf>
                <button className="text-white w-[200px] h-[50px] bg-black border border-blue-500 rounded-md hover:cursor-pointer hover:bg-sky-800">
                  Profile
                </button>
              </GesturesButtonProf>
              <GesturesButtonProf>
                {session?.user.role === "PROMOTOR" ? (
                  <button
                    onClick={() => router.push("/DashboardOrg")}
                    className="text-white w-[200px] h-[50px] bg-black border border-blue-500 rounded-md hover:cursor-pointer hover:bg-sky-800"
                  >
                    Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/DashCustomer")}
                    className="text-white w-[200px] h-[50px] bg-black border border-blue-500 rounded-md hover:cursor-pointer hover:bg-sky-800"
                  >
                    Dashboard
                  </button>
                )}
              </GesturesButtonProf>
              <GesturesButtonProf>
                <button
                  onClick={() => signOut({ redirectTo: "/" })}
                  className="text-white w-[200px] h-[50px] bg-red-500/30 border border-blue-500 rounded-md hover:cursor-pointer hover:bg-red-500"
                >
                  Log Out
                </button>
              </GesturesButtonProf>
            </div>
          </PopModalProf>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-[60px] left-0 w-full bg-white shadow-lg z-50 flex flex-col items-center gap-5 py-5">
          <div
            onClick={openModal}
            className="bg-black/40 w-[80%] h-[40px] rounded-md flex justify-center items-center shadow-md hover:cursor-pointer hover:bg-blue-500 border border-blue-500"
          >
            Register
          </div>
          <div
            onClick={() => router.push("/login")}
            className="bg-blue-500 w-[80%] h-[40px] rounded-md flex justify-center items-center shadow-md hover:cursor-pointer hover:bg-red-300"
          >
            Log In
          </div>
        </div>
      )}
      {/* Modal Register */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/30"
            onClick={closeModal}
          >
            <AnimasiPop>
              <div
                onClick={(e) => e.stopPropagation()} // mencegah modal tertutup saat klik di dalam modal
                className="bg-sky-800/50 w-[500px] p-6 rounded-md shadow-lg"
              >
                <button
                  onClick={closeModal}
                  className="bg-black border border-red-700 hover:bg-red-600/45 hover:cursor-pointer text-white ml-[410px] px-4 py-2 rounded-md"
                >
                  X
                </button>
                <RoleReg />
              </div>
            </AnimasiPop>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
