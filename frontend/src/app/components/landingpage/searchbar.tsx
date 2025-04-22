import { FaSearch } from "react-icons/fa";
export default function SearchComponents() {
  return (
    <div>
      <div className="px-10 mt-[25px] flex gap-5">
        <input
          type="text"
          id="search"
          placeholder="Find Events"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
        <button className="w-[50px] h-[50px] border bg-black/40 border-blue-500/60 flex justify-center items-center rounded-md">
          <FaSearch color="white" />
        </button>
      </div>
    </div>
  );
}
