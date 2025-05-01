"use client";

import { Formik, Form, Field, FormikHelpers } from "formik";
import * as yup from "yup";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface TicketFormProps {
  eventId: number;
}

interface TicketFormValues {
  price: number;
  quota: number;
  category: string;
}

const ticketSchema = yup.object().shape({
  price: yup.number().required("Harga wajib diisi").min(0),
  quota: yup.number().required("Kuota wajib diisi").min(1),
  category: yup.string().required("Kategori wajib diisi"),
});

export default function TicketForm({ eventId }: TicketFormProps) {
  const { data } = useSession();
  const router = useRouter();
  const initialValues: TicketFormValues = {
    price: 0,
    quota: 1,
    category: "",
  };
  const handleSubmit = async (
    values: TicketFormValues,
    actions: FormikHelpers<TicketFormValues>
  ) => {
    try {
        await axios.post(
        "/tickets",
        { ...values, eventId },
        {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        }
      );
      console.log("Submitting ticket:", { ...values, eventId })
      toast.success("Tiket berhasil dibuat!");
      actions.resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto bg-slate-900 rounded-lg shadow-md text-white">
      <h2 className="text-xl font-bold mb-4">Buat Tiket</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={ticketSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block mb-1">Harga Tiket</label>
              <Field
                name="price"
                type="number"
                className="w-full p-2 rounded bg-slate-800 border"
              />
              {touched.price && errors.price && (
                <div className="text-red-500">{errors.price}</div>
              )}
            </div>

            <div>
              <label className="block mb-1">Kuota</label>
              <Field
                name="quota"
                type="number"
                className="w-full p-2 rounded bg-slate-800 border"
              />
              {touched.quota && errors.quota && (
                <div className="text-red-500">{errors.quota}</div>
              )}
            </div>

            <div>
              <label className="block mb-1">Kategori</label>
              <Field
                name="category"
                placeholder="Contoh: VIP, Reguler"
                className="w-full p-2 rounded bg-slate-800 border"
              />
              {touched.category && errors.category && (
                <div className="text-red-500">{errors.category}</div>
              )}
            </div>
            <div className="flex justify-between">
                
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              {isSubmitting ? "Menyimpan..." : "Buat Tiket"}
            </button>
            <button
              type="submit"
              onClick={() => router.push("/")}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Back To Home
            </button>
            </div>
           
          </Form>
        )}
      </Formik>
    </div>
  );
}
