"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative inline-block text-left ml-[40px]">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex justify-center w-full rounded-lg bg-red-400 px-4 py-2 text-white font-medium hover:bg-red-500 shadow-md/25"
      >
        Category
        <ChevronDown className="ml-2 h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-44 rounded-lg bg-red-300 shadow-lg/30 z-50">
          <div className="py-1 text-black">
            <Link href="#" className="block px-4 py-2 hover:bg-red-500 rounded-md">
              GP Local Championship
            </Link>
            <Link href="#" className="block px-4 py-2 hover:bg-red-500 rounded-md">
              GP World Championship
            </Link>
            <Link href="#" className="block px-4 py-2 hover:bg-red-500 rounded-md">
              GP Urban Championship
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
