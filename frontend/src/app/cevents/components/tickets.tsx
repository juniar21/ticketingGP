"use client";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const createScheme = yup.object().shape({
  RegularTicket: yup
    .number()
    .required("Please input the regular ticket price")
    .min(10000, "Minimum price is IDR 10000"),
  VipTicket: yup
    .number()
    .required("Please input the regular ticket price")
    .min(20000, "Minimum price is IDR 20000"),
});
interface ITicketForm {
  RegularTicket: number;
  VipTicket: number;
}
export default function CreateForm() {
  const initialValues: ITicketForm = {
    RegularTicket: 0,
    VipTicket: 0,
  };
  const router = useRouter();
  const { data } = useSession();

  const createEvent = async (
    values: ITicketForm,
    actions: FormikHelpers<ITicketForm>
  ) => {
    try {
      const startDateTime = new Date(
        `${values.date}T${values.startTime}:00Z`
      ).toISOString();
      const endDateTime = new Date(
        `${values.date}T${values.endTime}:00Z`
      ).toISOString();
      const dateTime = new Date(values.date).toISOString();

      await axios.post(
        "/events",
        {
          title: values.title,
          category: values.category,
          startTime: startDateTime,
          endTime: endDateTime,
          date: dateTime,
          location: values.location,
          circuit: values.circuit,
        },
        {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        }
      );
      actions.resetForm();
      router.push("/");
      toast.success("Events Created!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Events Created Failed");
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={createScheme}
        onSubmit={createEvent}
      >
        {(props: FormikProps<ITicketForm>) => {
          const { errors, touched } = props;
          return (
            <Form className="flex justify-center sticky top-25">
              <div className="bg-black m-5 w-[300px] h-[300px] shadow-md/30 subpixel-antialiased border border-blue-500 rounded-md text-white">
              
                <div role="padding" className="p-5">
                    <p className="text-[30px] font-bold">TICKETING</p>
                  <h1 className="font-audio mt-[20px]">Regular Ticket Price</h1>
                  <Field
                    name="RegularTicket"
                    className="border w-[250px] h-[35px] shadow-md rounded-md pl-2 bg-slate-800"
                    placeholder="IDR"
                  />
                  {touched.RegularTicket && errors.RegularTicket ? (
                    <div className="text-red-500">{errors.RegularTicket}</div>
                  ) : null}
                  <h1 className="font-audio mt-[20px]">VIP Ticket Price</h1>
                  <Field
                    name="VipTicket"
                    className="border w-[250px] h-[35px] shadow-md rounded-md pl-2 bg-slate-800"
                    placeholder="IDR"
                  />
                  {touched.VipTicket && errors.VipTicket ? (
                    <div className="text-red-500">{errors.VipTicket }</div>
                  ) : null}
                  
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
