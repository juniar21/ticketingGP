/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import CeventsTitle from "./crEvent";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const createScheme = yup.object().shape({
  title: yup.string().required("Please input the title"),
  image: yup.mixed().required("Please input the right type of files"),
  category: yup.string().required("Please input the category"),
  date: yup.string(),
  startTime: yup.string(),
  endTime: yup.string(),
  location: yup.string().required("Please select location"),
  circuit: yup.string().required("Please select circuit"),
});

interface ICreateForm {
  title: string;
  image: null | File | Blob;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  circuit: string;
}

export default function CreateForm() {
  const initialValues: ICreateForm = {
    title: "",
    image: null,
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    circuit: "",
  };
  const router = useRouter();
  const { data } = useSession();

  const createEvent = async (
    values: ICreateForm
    // actions: FormikHelpers<ICreateForm>
  ) => {
    try {
      const formData = new FormData();
      formData.append("image", values.image as Blob); // Append image file
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append(
        "startTime",
        new Date(`${values.date}T${values.startTime}:00Z`).toISOString()
      );
      formData.append(
        "endTime",
        new Date(`${values.date}T${values.endTime}:00Z`).toISOString()
      );
      formData.append("date", new Date(values.date).toISOString());
      formData.append("location", values.location);
      formData.append("circuit", values.circuit);

      // Send the data to the backend
      await axios.post("/events/cloud", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the content type is set to multipart
          Authorization: `Bearer ${data?.accessToken}`, // Add the authorization token
        },
      });

      // Reset the form and redirect
      // actions.resetForm();
      router.push("/"); // Redirect after success
      toast.success("Event Created!");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Event Creation Failed");
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={createScheme}
        onSubmit={(values) => {
          createEvent(values);
        }}
      >
        {(props: FormikProps<ICreateForm>) => {
          const { errors, touched, isSubmitting, setFieldValue } = props;
          return (
            <Form className="flex justify-center">
              <div className="bg-black m-5 w-[600px] h-[950px] shadow-md/30 subpixel-antialiased rounded-md text-white">
                <CeventsTitle />
                <div role="padding" className="p-5">
                  <h1 className="font-audio">Title</h1>
                  <Field
                    name="title"
                    className="border w-[550px] h-[35px] shadow-md rounded-md pl-2 bg-slate-800"
                    placeholder="Title"
                  />
                  {touched.title && errors.title ? (
                    <div className="text-red-500">{errors.title}</div>
                  ) : null}

                  <p className="font-audio">Photo</p>
                  <input
                    type="file"
                    name="image"
                    className="border w-[550px] h-[35px] shadow-md rounded-md pl-2 bg-slate-800 hover:cursor-pointer"
                    placeholder="image"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        // Update the image file in Formik state
                        setFieldValue("image", e.target.files[0]);
                      }
                    }}
                  />
                  {touched.image && errors.image ? (
                    <div className="text-red-500">{errors.image}</div>
                  ) : null}

                  <h1 className="font-audio">Category</h1>
                  <Field
                    as="select"
                    name="category"
                    id="category"
                    className="w-[200px] h-[50px] border rounded-md bg-slate-800"
                  >
                    <option value="" disabled>
                      Choose category
                    </option>
                    <option value="GP Events">GP Events</option>
                    <option value="RoadRace Events">RoadRace Events</option>
                  </Field>
                  {touched.category && errors.category ? (
                    <div className="text-red-500 shadow-md">
                      {errors.category}
                    </div>
                  ) : null}

                  <div
                    role="date"
                    className="mt-[20px] text-white bg-slate-800 w-[650] h-[300px] rounded-md shadow-md border border-black/30"
                  >
                    <div
                      role="date"
                      className=" bg-blue-500 w-[650] h-[50px] rounded-t-md flex justify-center items-center"
                    >
                      <p className="font-audio subpixel-antialiased font-bold text-[25px]">
                        DATE
                      </p>
                    </div>
                    <div className="p-3">
                      <p className="block text-sm font-medium font-audio">
                        Date
                      </p>
                      <Field
                        type="date"
                        id="date"
                        name="date"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <p className="block pt-3 text-sm font-medium font-audio">
                        Start Time
                      </p>
                      <Field
                        type="time"
                        id="startTime"
                        name="startTime"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <p className="block text-sm font-medium pt-3 font-audio">
                        End Time
                      </p>
                      <Field
                        type="time"
                        id="endTime"
                        name="endTime"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="pt-5">
                    <p className="font-audio">LOCATION</p>
                    <Field
                      name="location"
                      className="border w-[550px] h-[35px] shadow-md rounded-md pl-2 bg-slate-800"
                      placeholder="location"
                    />
                    {touched.location && errors.location ? (
                      <div className="text-red-500">{errors.location}</div>
                    ) : null}
                    <p className="font-audio pt-2">CIRCUIT</p>
                    <Field
                      name="circuit"
                      className="border w-[550px] h-[35px] shadow-md rounded-md pl-2 bg-slate-800"
                      placeholder="circuit"
                    />
                    {touched.circuit && errors.circuit ? (
                      <div className="text-red-500">{errors.circuit}</div>
                    ) : null}
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={()=> router.push("/")}
                      className="mt-[20px] rounded-md bg-black border border-blue-500 w-[100px] h-[50px] hover:cursor-pointer hover:bg-blue-900/50"
                    >
                      {isSubmitting ? "loading" : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
