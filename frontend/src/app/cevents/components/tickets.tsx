"use client";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const createScheme = yup.object().shape({
  category: yup.string().required("Please type Regular or VIP"),
  regularTicket: yup
    .number()
    .required("Please input the regular ticket price")
    .min(10000, "Minimum price is IDR 10000"),
  quota: yup
    .number()
    .required("Please input the regular ticket price")
    .min(1, "Minimum quota is 1"),
});
interface ITicketForm {
  category: string;
  categoryPrice: number;
  quota: number;
}
export default function CreateTicketForm() {
  const initialValues: ITicketForm = {
    category: "",
    categoryPrice: 0,
    quota: 0
  };
  const router = useRouter();
  const { data } = useSession();
useEffect(() => {

  const getEventId = async ()=> {
    try {
      const res = await axios.get("/events/getEve", {
        headers: {
          Authorization: `Bearer ${data?.accessToken}`
        }
      })
      console.log(res);
      
    } catch (error) {
      console.log(error)
    }
  }

  getEventId()
}, [])
  const createTicketEvent = async (
    values: ITicketForm,
    actions: FormikHelpers<ITicketForm>
  ) => {
    try {
      await axios.post("/tickets",{
        category: values.category,
        price: values.categoryPrice,
        quota: values.quota
      },{
        headers: {
          Authorization: `Bearer ${data?.accessToken}`,
        },
      }
    )
      ;
      actions.resetForm();
      router.push("/");
      toast.success("Events Created!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Ticket Event Failed");
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={createScheme}
        onSubmit={createTicketEvent}
      >
        {(props: FormikProps<ITicketForm>) => {
          const { errors, touched } = props;
          return (
            <Form className="flex justify-center sticky top-25">
              <div className="bg-black m-5 w-[300px] h-[350px] shadow-md/30 subpixel-antialiased border border-blue-500 rounded-md text-white">
              
                <div role="padding" className="p-5">
                    <p className="text-[30px] font-bold">TICKETING</p>
                  <h1 className="font-audio mt-[20px]">Category</h1>
                  <Field
                    name="category"
                    className="border w-[250px] h-[35px] shadow-md rounded-md pl-2 bg-slate-800"
                    placeholder="Regular / VIP"
                  />
                  {touched.category && errors.category ? (
                    <div className="text-red-500">{errors.category}</div>
                  ) : null}
                  <h1 className="font-audio mt-[20px]">Price</h1>
                  <Field
                    name="category"
                    className="border w-[250px] h-[35px] shadow-md rounded-md pl-2 bg-slate-800"
                    placeholder="IDR"
                  />
                  {touched.categoryPrice && errors.categoryPrice ? (
                    <div className="text-red-500">{errors.categoryPrice}</div>
                  ) : null}
                  <h1 className="font-audio mt-[20px]">Quota</h1>
                  <Field
                    name="RegularTicket"
                    className="border w-[250px] h-[35px] shadow-md rounded-md pl-2 bg-slate-800"
                    placeholder="Seats"
                  />
                  {touched.quota && errors.quota ? (
                    <div className="text-red-500">{errors.quota}</div>
                  ) : null}
                  <button className="w-[100px] h-[50px] bg-blue-500">
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
