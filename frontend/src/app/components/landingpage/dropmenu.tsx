import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const DropdownMenu: React.FC<{
  onCategorySelect: (category: string) => void;
}> = ({ onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const categories = [
    { name: "All Events", value: "All Events" },
    { name: "GP Events", value: "GP Events" },
    { name: "RoadRace Events", value: "RoadRace Events" },
  ];

  const handleCategorySelect = (category: string) => {
    onCategorySelect(category);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left ml-[40px] mt-[20px]">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex justify-center w-full rounded-lg bg-red-400 px-4 py-2 text-white font-medium hover:bg-red-500 shadow-md/25 hover:cursor-pointer"
      >
        Category{" "}
        {isOpen ? (
          <ChevronUp className="ml-2 h-5 w-5" />
        ) : (
          <ChevronDown className="ml-2 h-5 w-5" />
        )}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-44 rounded-lg bg-red-300 shadow-lg/30 z-50">
          <div className="py-1 text-black">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategorySelect(category.value)}
                className="block w-full px-4 py-2 text-left hover:bg-red-500 rounded-md hover:cursor-pointer"
              >
                {category.name}
              </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
