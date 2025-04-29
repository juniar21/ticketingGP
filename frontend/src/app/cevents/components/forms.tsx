/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import CeventsTitle from "./crEvent";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import ImageUploader from "./ImageUploaders";
 // Pastikan komponen ini ada dan bekerja dengan baik

const createScheme = yup.object().shape({
  title: yup.string().required("Please input the title"),
  category: yup.string().required("Please input the category"),
  date: yup.string(),
  startTime: yup.string(),
  endTime: yup.string(),
  location: yup.string().required("Please select location"),
  circuit: yup.string().required("Please select circuit"),
  image: yup.mixed().required("Image is required"),
});

interface ICreateForm {
  title: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  circuit: string;
  image?: File | null;
}

export default function CreateForm() {
  const initialValues: ICreateForm = {
    title: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    circuit: "",
    image: null,
  };

  const router = useRouter();
  const { data } = useSession();

  const createEvent = async (
    values: ICreateForm,
    actions: FormikHelpers<ICreateForm>
  ) => {
    try {
      // Menyiapkan FormData untuk upload
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("location", values.location);
      formData.append("circuit", values.circuit);
      formData.append("startTime", values.startTime);
      formData.append("endTime", values.endTime);
      formData.append("date", values.date);

      // Menambahkan image jika ada
      if (values.image) formData.append("image", values.image);

      // Debug log untuk memastikan semua data sudah dimasukkan ke FormData
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      // Mengirim data ke API
      await axios.post("/events/cloud", formData, {
        headers: {
          Authorization: `Bearer ${data?.accessToken}`,
        },
      });

      // Reset form setelah submit
      actions.resetForm();
      router.push("/"); // Redirect ke halaman utama
      toast.success("Event Created Successfully!");
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
        onSubmit={createEvent}
      >
        {(props: FormikProps<ICreateForm>) => {
          const { errors, touched, isSubmitting } = props;
          return (
            <Form className="flex justify-center" encType="multipart/form-data">
              <div className="bg-black m-5 w-[700px] h-[900px] shadow-md/30 subpixel-antialiased rounded-md text-white">
                <CeventsTitle />
                <div role="padding" className="p-5">
                  <h1 className="font-audio">Title</h1>
                  <Field
                    name="title"
                    className="border w-[650px] h-[35px] shadow-md rounded-md pl-2 bg-slate-800"
                    placeholder="Title"
                  />
                  {touched.title && errors.title && (
                    <div className="text-red-500">{errors.title}</div>
                  )}

                  <h1 className="font-audio pt-2">Image</h1>
                  {/* Ganti input file dengan ImageUploader */}
                  <ImageUploader
                    onChange={(file) => props.setFieldValue("image", file)}
                  />
                  {touched.image && errors.image && (
                    <div className="text-red-500">
                      {(errors.image as string) || "Invalid file"}
                    </div>
                  )}

                  <h1 className="font-audio pt-[20px]">Category</h1>
                  <Field
                    as="select"
                    name="category"
                    id="category"
                    className="w-[200px] h-[50px] border rounded-md bg-slate-800"
                  >
                    <option value="" disabled>
                      Choose category
                    </option>
                    <option value="category1">GP Events</option>
                    <option value="category2">RoadRace Events</option>
                  </Field>
                  {touched.category && errors.category && (
                    <div className="text-red-500 shadow-md">
                      {errors.category}
                    </div>
                  )}

                  <div role="date" className="mt-[20px] text-white bg-slate-800 w-[650] h-[300px] rounded-md shadow-md border border-black/30">
                    <div role="date" className=" bg-blue-500 w-[650] h-[50px] rounded-t-md flex justify-center items-center">
                      <p className="font-audio subpixel-antialiased font-bold text-[25px]">DATE</p>
                    </div>
                    <div className="p-3">
                      <p className="block text-sm font-medium font-audio">Date</p>
                      <Field
                        type="date"
                        id="date"
                        name="date"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <p className="block pt-3 text-sm font-medium font-audio">Start Time</p>
                      <Field
                        type="time"
                        id="startTime"
                        name="startTime"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <p className="block text-sm font-medium pt-3 font-audio">End Time</p>
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
                      className="border w-[650px] h-[35px] shadow-md rounded-md pl-2 bg-slate-800"
                      placeholder="Location"
                    />
                    {touched.location && errors.location && (
                      <div className="text-red-500">{errors.location}</div>
                    )}

                    <p className="font-audio pt-2">CIRCUIT</p>
                    <Field
                      name="circuit"
                      className="border w-[650px] h-[35px] shadow-md rounded-md pl-2 bg-slate-800"
                      placeholder="Circuit"
                    />
                    {touched.circuit && errors.circuit && (
                      <div className="text-red-500">{errors.circuit}</div>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="mt-[20px] rounded-md bg-black border border-blue-500 w-[100px] h-[50px] hover:cursor-pointer hover:bg-blue-900/50"
                      disabled={isSubmitting} // Disable when submitting
                    >
                      {isSubmitting ? "loading..." : "Submit"}
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
