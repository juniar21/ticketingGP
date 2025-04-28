"use client";
import { useState } from "react";

export default function TabComponent() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        
        <div className="flex gap-3 border-b">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`py-2 px-4 text-sm font-medium rounded-md ${
              activeTab === "upcoming"
                ? "text-white bg-blue-600"
                : "text-white bg-gray-900 hover:bg-blue-500 hover:cursor-pointer"
            }`}
          >
            Events Created
          </button>
          <button
            onClick={() => setActiveTab("ended")}
            className={`py-2 px-4 text-sm font-medium rounded-md ${
              activeTab === "ended"
                ? "text-white bg-blue-600"
                : "text-white bg-gray-900 hover:bg-blue-500 hover:cursor-pointer"
            }`}
          >
            Events Ended
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === "upcoming" ? (
            <p className="text-center text-white">
              No upcoming events scheduled
            </p>
            
          ) : (
            <p className="text-center text-white">No ended events yet</p>
          )}
        </div>
      </div>
    
  );
}
