import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const DropdownMenu: React.FC<{
  categories: string[];
  onCategorySelect: (category: string) => void;
}> = ({ categories, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCategorySelect = (category: string) => {
    onCategorySelect(category); // Mengirimkan kategori yang dipilih ke parent
    setIsOpen(false); // Menutup dropdown setelah memilih kategori
  };

  return (
    <div className="relative inline-block text-left ml-[40px] mt-[20px]">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex justify-center w-full rounded-lg bg-black/45 border border-blue-500 px-4 py-2 text-white font-medium hover:bg-red-500 shadow-md/25 hover:cursor-pointer"
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
                key={category}
                onClick={() => handleCategorySelect(category)}
                className="block w-full px-4 py-2 text-left hover:bg-red-500 rounded-md hover:cursor-pointer"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
