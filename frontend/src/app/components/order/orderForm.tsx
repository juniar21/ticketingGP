/* eslint-disable @typescript-eslint/no-explicit-any */
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
  ticket: Ticket;  // Menerima tiket yang dipilih
}

export default function CreateOrderForm({ ticket }: CreateOrderFormProps) {
    const { data } = useSession();
    const [quantity, setQuantity] = useState(1);
    const [amount] = useState(ticket.price);
    const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
    const [orderStatus, setOrderStatus] = useState<string | null>(null); // ✅ status order
    const [loading, setLoading] = useState(false);
  
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
  
        setInvoiceUrl(response.data.invoice.invoiceUrl);
        setOrderStatus(response.data.order?.status || null); // ✅ simpan status
        toast.success("Order Created Successfully!");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to create order");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="order-form">
        <h1>Create Order</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ticketId">Ticket: {ticket.category}</label>
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              required
            />
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={amount * quantity} readOnly />
          </div>
          <button type="submit" disabled={loading} className="hover:bg-sky-700">
            {loading ? "Creating Order..." : "Create Order"}
          </button>
        </form>
  
        {invoiceUrl && (
          <div className="invoice">
            <h2>Invoice URL</h2>
            <a href={invoiceUrl} target="_blank" rel="noopener noreferrer">
              Go to Invoice
            </a>
          </div>
        )}
  
        {/* ✅ Menampilkan pesan jika sudah paid */}
        {orderStatus === "PAID" && (
          <div className="mt-4 text-green-600 font-semibold">
            Payment Success!
          </div>
        )}
      </div>
    );
  }