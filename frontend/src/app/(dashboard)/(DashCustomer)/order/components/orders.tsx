/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "@/lib/axios";
import { ITicket } from "@/types/typemodel";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IOrder {
  id: string;
  ticketId: string;
  quantity: number;
  amount: number;
  status: string;
  invoiceURL: string;
  ticket: ITicket;
}
export default function OrderHistorys() {
  const { data } = useSession();
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const session = await axios.get("/orders/getAllOrders", {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        });

        const order: IOrder[] = session.data.data;
        console.log(order);

        setOrders(order);
      } catch (err: any) {
        if (err instanceof AxiosError){
          toast.error(err.response?.data?.error || "Fetch Data Failed")
        }
      }
    };

    if (data?.accessToken) {
      fetchOrders();
    }
  }, [data?.accessToken]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {orders.map((order) => (
        <div
          className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition-shadow duration-300"
          key={order.id}
        >
          <h3 className="text-lg font-semibold mb-2">{order.ticket.category}</h3>
          <p className="text-gray-600 text-sm">🎟 Ticket ID: <span className="font-medium">{order.ticketId}</span></p>
          <p className="text-gray-600 text-sm">🔢 Kuantitas: <span className="font-medium">{order.quantity}</span></p>
          <p className="text-gray-600 text-sm">📦 Status: <span className="font-medium">{order.status}</span></p>
          <p className="text-gray-600 text-sm">💵 Amount: <span className="font-medium">Rp {order.amount.toLocaleString()}</span></p>
        </div>
      ))}
    </div>
  );
}
