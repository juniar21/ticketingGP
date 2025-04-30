"use client"
import axios from "@/lib/axios";
import { ITicket } from "@/types/typemodel";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface IOrder {
    idOrder : string,
    ticketId : string,
    quantity : number,
    amount : number,
    status : string,
    invoiceURL : string,
    ticket : ITicket
}
export default function OrderHistorys(){
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
        } catch (err) {
          console.error(err);
        }
      };
    
      if (data?.accessToken) {
        fetchOrders();
      }
    }, [data?.accessToken]);
  
  return(
    <div>
      {orders.map((order)=> (
        <div className="bg-white w-[300px] ml-5 p-5" key={order.idOrder}>
          <p>{order.ticket.category}</p>
          <p>Ticket Id : {order.ticketId}</p>
          <p>Kuantitas : {order.quantity}</p>
          <p>Status : {order.status}</p>
          <p>Amount : {order.amount}</p>
        </div>
      ))}
    </div>
  )
}