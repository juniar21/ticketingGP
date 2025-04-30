"use client";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ChartData = () => {
  const { data } = useSession();
  interface Metrics {
    totalEvents: number;
    totalOrders: number;
    totalProfit: number;
    totalTickets: number;
  }

  const [metrics, setMetrics] = useState<Metrics>({
    totalEvents: 0,
    totalOrders: 0,
    totalProfit: 0,
    totalTickets: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get("/events/dashmetric", {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        });

        console.log(response.data);

        const { totalEvents, totalOrders, totalProfit, totalTickets } =
          response.data;
        setMetrics({
          totalEvents,
          totalOrders,
          totalProfit,
          totalTickets,
        });
      } catch (err) {
        console.error("Error fetching metrics:", err);
      }
    };

    if (data?.accessToken) {
      fetchMetrics();
    }
  }, [data?.accessToken]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <MetricCard title="Total Events" value={metrics.totalEvents} />
      <MetricCard title="Total Orders" value={metrics.totalOrders} />
      <MetricCard
        title="Total Profit"
        value={`Rp. ${metrics.totalProfit.toLocaleString()}`}
      />
      <MetricCard title="Total Tickets" value={metrics.totalTickets} />
    </div>
  );
};

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-start">
      <span className="text-sm text-gray-500">{title}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}

export default ChartData;
