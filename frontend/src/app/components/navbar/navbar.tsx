"use client";
import RoleReg from "@/app/(auth)/register/components/role";
import GesturesButton from "@/app/anim/gestures";
import AnimasiPop from "@/app/anim/pop";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function NavbarPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu
  const router = useRouter();
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Fungsi untuk modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="h-[60px] sm:h-[70px] md:h-[80px] px-4 sm:px-6 lg:px-10 bg-black/30 sticky top-0 flex justify-between items-center z-20">
      <div className="flex items-center">
        <p className="text-blue-500 font-extrabold text-[30px]">GP.TIXET</p>
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

      {/* Desktop Login and Register Buttons */}
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
