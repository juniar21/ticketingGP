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
    <div>
      {orders.map((order) => (
        <div className="bg-white w-[300px] ml-5 p-5" key={order.id}>
          <p>{order.ticket.category}</p>
          <p>Ticket Id : {order.ticketId}</p>
          <p>Kuantitas : {order.quantity}</p>
          <p>Status : {order.status}</p>
          <p>Amount : {order.amount}</p>
        </div>
      ))}
    </div>
  );
}
