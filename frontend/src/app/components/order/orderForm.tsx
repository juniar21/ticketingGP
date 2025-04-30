/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Ticket {
  id: number;
  category: string;
  price: number;
  quota: number;
}

interface IOrder {
  ticketId: string;
  quantity: number;
  amount: number;
}

interface CreateOrderFormProps {
  ticket: Ticket; // Menerima tiket yang dipilih
}

export default function CreateOrderForm({ ticket }: CreateOrderFormProps) {
  const { data } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [amount] = useState(ticket.price);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<string | null>(null); // ✅ status order
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null); // Untuk melacak ID order

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData: IOrder = {
        ticketId: ticket.id.toString(),
        quantity,
        amount: amount * quantity,
      };

      const response = await axios.post("/orders", orderData, {
        headers: {
          Authorization: `Bearer ${data?.accessToken}`,
        },
      });
      const res = response
      setInvoiceUrl(response.data.invoice.invoiceUrl);
      setOrderStatus(response.data.invoice?.status || null);
      console.log(res.data.invoice?.status) // ✅ simpan status
      setOrderId(response.data.order?.id || null); // Simpan ID order untuk tracking status
      toast.success("Order Created Successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk memperbarui status secara manual ketika tombol di-click
  const updateOrderStatus = async () => {
    if (!orderId) return;
    
    try {
      const response = await axios.get(`/orders/get-order-id/${orderId}`, {
        headers: {
          Authorization: `Bearer ${data?.accessToken}`,
        },
      });
      
      setOrderStatus(response.data.invoice?.status || null)
      console.log(orderStatus); // Perbarui status dengan yang terbaru
      toast.success("Order status updated successfully!");
    } catch (error) {
      console.log(error)
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="order-form">
      <h1>Order Receipt</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ticketId">Ticket: {ticket.category}</label>
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            className="ml-2 w-[50px] rounded-md border border-black/50"
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount : IDR</label>
          <input
            className="ml-2"
            type="number"
            id="amount"
            value={amount * quantity}
            readOnly
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-5 bg-black text-white p-2 rounded-sm border border-black/30 cursor-pointer"
        >
          {loading ? "Creating Order..." : "Create Order"}
        </button>
      </form>

      {invoiceUrl && (
        <div className="invoice">
          <h2>Invoice URL</h2>
          <a
            href={invoiceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4"
          >
            Go to Invoice
          </a>
          
          {/* Tombol Update Status */}
          <button
            onClick={updateOrderStatus}
            className="bg-blue-500 text-white p-2 rounded-sm mt-4"
          >
            Update Status
          </button>

          {/* Menampilkan status order di bawah tombol Update Status */}
          <div className="mt-4">
            {orderStatus === "PAID" && (
              <div className="text-green-600 font-semibold">
                Payment Successful! Your order is paid.
              </div>
            )}
            {orderStatus === "PENDING" && (
              <div className="text-yellow-600 font-semibold">
                Payment is pending. Please complete your payment.
              </div>
            )}
            {orderStatus === null && (
              <div className="text-gray-600 font-semibold">
                Order is being processed.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
