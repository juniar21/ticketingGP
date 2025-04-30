"use client";

import axios from "@/lib/axios";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IOrder {
  id: string;
  createdAt: string; // pastikan ini format ISO date
  amount: number;
}

interface IChartData {
  name: string;
  total: number;
}

const StasDay = () => {
  const { data } = useSession();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [chartData, setChartData] = useState<IChartData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const session = await axios.get("/orders/getOrders", {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        });
        console.log(session);

        const order: IOrder[] = session.data.data;
        // sesuaikan endpointmu
        setOrders(order);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, [data?.accessToken]);

  useEffect(() => {
    if (orders.length > 0) {
      const grouped: { [key: string]: number } = {};

      orders.forEach((order) => {
        const date = new Date(order.createdAt);
        const key = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`; // Tahun-Bulan-Hari

        if (!grouped[key]) {
          grouped[key] = 0;
        }
        grouped[key] += order.amount;
      });

      const chartArray = Object.entries(grouped).map(([key, total]) => ({
        name: key,
        total,
      }));

      setChartData(chartArray);
    }
  }, [orders]);

  return (
    <div className="w-full h-[500px]">
      <h2 className="text-2xl font-bold mb-4">Orders Chart (by Day)</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" name="Total Amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StasDay;
