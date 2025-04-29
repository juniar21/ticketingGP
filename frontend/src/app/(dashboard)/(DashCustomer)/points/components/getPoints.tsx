'use client';

import { useEffect, useState } from 'react';
import  axios from '@/lib/axios';
import { useSession } from 'next-auth/react';



export default function RewardsPage() {
  const { data } = useSession();
  const [totalValidPoints, setTotalValidPoints] = useState(0);
  const [totalValidVouchers, setTotalValidVouchers] = useState(0);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await axios.get("/points", {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        });

        console.log(res.data);
        
        setTotalValidPoints(res.data.totalValidPoints);
        setTotalValidVouchers(res.data.totalValidVouchers);

      } catch (error) {
        console.error('Error fetching rewards:', error);
      }
    };

    if (data?.accessToken) {
      fetchRewards();
    }
  }, [data?.accessToken]);


  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card title="Total Points" value={`${totalValidPoints} pts`} />
      <Card title="Total Vouchers" value={`${totalValidVouchers.toLocaleString()} %`} />
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white shadow rounded-2xl p-6 flex flex-col">
      <span className="text-sm text-gray-500">{title}</span>
      <span className="text-2xl font-bold mt-1">{value}</span>
    </div>
  );
}