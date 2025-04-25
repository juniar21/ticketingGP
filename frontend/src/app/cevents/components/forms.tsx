"use client";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import CeventsTitle from "./crEvent";

const createScheme = yup.object().shape({
  title: yup.string().required("please input the title"),
  cateogry: yup.string().required("please input the category"),
});
interface ICreateForm {
  title: string;
  category: string;
}
export default function CreateForm() {
  const initialValues: ICreateForm = {
    title: "",
    category: "",
  };
  const router = useRouter();
  const createEvent = async (
    values: ICreateForm,
    actions: FormikHelpers<ICreateForm>
  ) => {
    try {
    } catch (error) {
      console.log(error);
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
            <Form className="flex justify-center">
              <div className="bg-black m-5 w-[700px] h-[800px] shadow-md/30 subpixel-antialiased rounded-md text-white">
                <CeventsTitle />
                <div role="padding" className="p-5">
                  <h1 className="font-audio">Title</h1>
                  <Field
                    name="title"
                    className="border w-[650px] h-[35px] shadow-md rounded-md pl-2 bg-slate-800"
                    placeholder="Title"
                  />
                  {touched.title && errors.title ? (
                    <div className="text-red-500">{errors.title}</div>
                  ) : null}
                  <h1 className="font-audio pt-[20px]">Category</h1>
                  <select
                    id="category"
                    name="category"
                    className="w-[200px] h-[50px] border rounded-md bg-slate-800"
                    required
                  >
                    <option defaultValue="" disabled selected>
                      Choose category
                    </option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                  </select>
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
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <p className="block pt-3 text-sm font-medium font-audio">
                        Start Time
                      </p>
                      <input
                        type="time"
                        id="start-time"
                        name="start-time"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <p className="block text-sm font-medium pt-3 font-audio">
                        End Time
                      </p>
                      <input
                        type="time"
                        id="end-time"
                        name="end-time"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="pt-5">
                    <p className="font-audio">LOCATION</p>
                    <Field
                      name="title"
                      className="border w-[650px] h-[35px] shadow-md rounded-md pl-2 bg-slate-800"
                      placeholder="Location"
                    />
                    {touched.title && errors.title ? (
                      <div className="text-red-500">{errors.title}</div>
                    ) : null}
                    <p className="font-audio pt-2">CIRCUIT</p>
                    <Field
                      name="title"
                      className="border w-[650px] h-[35px] shadow-md rounded-md pl-2 bg-slate-800"
                      placeholder="Circuit"
                    />
                    {touched.title && errors.title ? (
                      <div className="text-red-500">{errors.title}</div>
                    ) : null}
                  </div>
                  <div>
                    <button className="mt-[20px] rounded-md bg-black border border-blue-500 w-[100px] h-[50px]">{isSubmitting ? "Loading" : "Submit"}</button>
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
