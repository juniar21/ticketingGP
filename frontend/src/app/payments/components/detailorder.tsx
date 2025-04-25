"use client"
import { useRouter } from "next/navigation";

export default function OrderDetail() {
  const order = {
    vip: 1000000,
    vipCount: 2,
    reg: 250000,
    regCount: 1,
    total: 1250000,
  };
  const router = useRouter()
  return (
    <div className="flex justify-center mt-[50px]">
      <div className="bg-white w-[500px] h-[500px]">
        <p className="text-blue-500 text-[30px] font-bold p-3">GPTIXET</p>
        <div className="flex justify-center">
          <div className="w-[450px] h-[1px] border border-black p-0"></div>
        </div>
        <div className="p-3">
          <p className="font-bold text-[25px]">Order Summary</p>
          <p>Regular Pass : {order.regCount}</p>
          <p>Regular Pass Price : {order.reg}</p>
          <p>Vip Pass : {order.vipCount}</p>
          <p>Vip Pass Price : {order.vip}</p>
          <p className="mt-[20px]">Total Payment : {order.total}</p>
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
