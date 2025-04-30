"use client"
import axios from "@/lib/axios";
import { IOrder } from "@/types/typemodel";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetail() {
  const { data } = useSession();
  const orders = {
    vip: 1000000,
    vipCount: 2,
    reg: 250000,
    regCount: 1,
    total: 1250000,
  };
  const router = useRouter();

    const [order, setOrders] = useState<IOrder[]>([]); 
    
    const onGet = async () => {
    try {
      const response = await axios.get("/orders/getOrders",{
        headers: {
          Authorization: `Bearer ${data?.accessToken}`,
        },
      });
      const order: IOrder[] = response.data.data;
      console.log(order);
      
      setOrders(order);
    } catch (err) {
      console.log(err);
      }
    }
  useEffect(() => {
      onGet();
        }, []);

  return (
    <div className="flex justify-center mt-[50px]">
      <div className="bg-white w-[500px] h-[500px]">
        <p className="text-blue-500 text-[30px] font-bold p-3">GPTIXET</p>
        <div className="flex justify-center">
          <div className="w-[450px] h-[1px] border border-black p-0"></div>
        </div>
        <div className="p-3">
          <p className="font-bold text-[25px]">Order Summary</p>
          <p>Regular Pass : {orders.regCount}</p>
          <p>Regular Pass Price : {orders.reg}</p>
          <p>Vip Pass : {orders.vipCount}</p>
          <p>Vip Pass Price : {orders.vip}</p>
          <p className="mt-[20px]">Total Payment : {orders.total}</p>
          <div className="flex justify-center">
            <button onClick={()=> router.push("/paymentdone") } className="mt-[50px] w-[400px] h-[50px] bg-green-500 hover:cursor-pointer">
              Proceed Payment
            </button>
          </div>
          <p className="mt-[10px] text-gray-600">
            Copyright ©2025 Kadek & Arang. All rights reserved.
            No part of this work may be copied, distributed, or reproduced in
            any form without prior written permission from the copyright holder.
          </p>
        </div>
      </div>
    </div>
  );
}
