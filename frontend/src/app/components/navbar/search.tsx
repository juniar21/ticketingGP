import React from "react";

const SearchBar = () => {
  return (
    <div className="flex items-center space-x-2 bg-blue-100 border border-blue-300 rounded-md px-4 py-2 w-full max-w-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
      </svg>
      <input
        type="text"
        placeholder="Search.."
        className="flex-grow bg-transparent text-sm placeholder-gray-500 text-black focus:outline-none"
      />
      <button className="bg-blue-400 hover:bg-blue-600 text-black text-sm font-medium px-4 py-1 rounded">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
