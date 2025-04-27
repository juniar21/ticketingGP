"use client";
import GesturesButton from "@/app/anim/gestures";
import axios from "@/lib/axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as yup from "yup";

const registerScheme = yup.object().shape({
  email: yup
    .string()
    .required("Please input the email")
    .email("please use the correct email"),
  username: yup.string().required("Please input the username"),
  fullname: yup.string().required("please input the fullname"),
  password: yup.string().required("Please use the correct Password"),
  referredBy: yup.string(),
});

interface IRegForm {
  email: string;
  password: string;
  username: string;
  fullname: string;
  referredBy: string;
}
// interface IProps {
//   onReload: () => void;
// }

export default function RegisterForm() {
  const initialValues: IRegForm = {
    email: "",
    password: "",
    username: "",
    fullname: "",
    referredBy: "",
  };
  const router = useRouter();
  const regUser = async (
    values: IRegForm,
    actions: FormikHelpers<IRegForm>
  ) => {
    try {
      await axios.post("/auth/customer/register", values);
      actions.resetForm();
      toast.success("register success!");
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "register failed");
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={registerScheme}
        onSubmit={regUser}
      >
        {(props: FormikProps<IRegForm>) => {
          const { errors, touched, isSubmitting } = props;
          return (
            <Form className="relative">
              <div>
                <Image
                  className="absolute z-0 object-cover h-screen w-screen"
                  src={
                    "https://res.cloudinary.com/dtsxir6lv/image/upload/v1745309856/wallpapersden.com_valentino-rossi-moto-gp-ducati_1920x1080_gyiwfv.jpg"
                  }
                  alt="background"
                  width={1800}
                  height={1800}
                />
              </div>
              <div className="flex justify-center relative z-10">
                <div className="bg-sky-950/80 mt-[20px] rounded-2xl border border-slate-500/10 shadow-md max-sm:w-[300px] sm:w-[300px] md:w-[400px] max-sm:ml-0 sm:ml-0 md:ml-0">
                  <div className="p-10 flex flex-col justify-center items-center gap-1">
                    <div className="flex flex-col gap-2 mt-[-20px]">
                      <div className="flex flex-col items-center justify-center">
                        <div>
                          <p
                            onClick={() => router.push("/")}
                            className="font-extrabold text-[50px] text-blue-400 drop-shadow-md/50 cursor-pointer"
                          >
                            GP.TIX
                          </p>
                        </div>
                        <h1 className=" text-white font-bold text-[25px] drop-shadow-md/90 ">
                          CUSTOMER
                        </h1>
                      </div>
                      <Field
                        name="email"
                        className="mt-[15px] border border-slate-500 bg-slate-800 w-[300px] text-white rounded-md shadow-md h-[50px] p-5 max-sm:w-[250px] sm:w-[250px] md:w-[320px]"
                        placeholder="email"
                      />
                      {touched.email && errors.email ? (
                        <div className="text-red-500 font-bold drop-shadow-md/90">
                          {errors.email}
                        </div>
                      ) : null}
                      <Field
                        name="password"
                        type="password"
                        className="border border-slate-500 bg-slate-800 w-[300px] text-white rounded-md shadow-md h-[50px] p-5 max-sm:w-[250px] sm:w-[250px] md:w-[320px]"
                        placeholder="password"
                      />
                      {touched.password && errors.password ? (
                        <div className="text-red-500 font-bold drop-shadow-md/90">
                          {errors.password}
                        </div>
                      ) : null}

                      <Field
                        name="username"
                        className="border border-slate-500 bg-slate-800 w-[300px] text-white rounded-md shadow-md h-[50px] p-5 max-sm:w-[250px] sm:w-[250px] md:w-[320px]"
                        placeholder="username"
                      />
                      {touched.username && errors.username ? (
                        <div className="text-red-500 font-bold drop-shadow-md/90">
                          {errors.username}
                        </div>
                      ) : null}
                      <Field
                        name="fullname"
                        type="fullname"
                        className="border border-slate-500 bg-slate-800 text-white w-[300px] rounded-md shadow-md h-[50px] p-5 max-sm:w-[250px] sm:w-[250px] md:w-[320px]"
                        placeholder="fullname"
                      />
                      {touched.password && errors.password ? (
                        <div className="text-red-500 font-bold drop-shadow-md/90">
                          {errors.password}
                        </div>
                      ) : null}
                      <Field
                        name="referredBy"
                        type="referredBy"
                        className="border border-slate-500 bg-slate-800 w-[300px] text-white rounded-md shadow-md h-[50px] p-5 max-sm:w-[250px] sm:w-[250px] md:w-[320px]"
                        placeholder="Referral Code"
                      />
                      {touched.password && errors.password ? (
                        <div className="text-red-500 font-bold drop-shadow-md/90">
                          {errors.password}
                        </div>
                      ) : null}
                      <GesturesButton>
                        <button
                          type="submit"
                          onSubmit={() => router.push("/login")}
                          className="bg-black border border-blue-600 text-white w-[300px] h-[50px] hover:bg-blue-900/50 rounded-md shadow-md hover:cursor-pointer max-sm:w-[250px] sm:w-[250px] md:w-[320px]"
                        >
                          {isSubmitting ? "loading" : "Register"}
                        </button>
                      </GesturesButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center relative z-10">
                <div className="bg-sky-950/80 border rounded-2xl w-[400px] border-slate-500/10 mt-[25px] ml-[-100px] shadow-md max-sm:ml-0 sm:ml-0 md:ml-0">
                  <div className="text-white flex justify-center items-center gap-3 p-3">
                    <p>Sudah punya akun?</p>
                    <p
                      onClick={() => router.push("/login")}
                      className="font-bold text-blue-400 hover:cursor-pointer"
                    >
                      Login
                    </p>
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
