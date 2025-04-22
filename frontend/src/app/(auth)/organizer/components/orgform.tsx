"use client";
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
});

interface IRegForm {
  email: string;
  password: string;
  username: string;
  fullname: string;
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
   
  };
  const router = useRouter();
  const regUser = async (
    values: IRegForm,
    actions: FormikHelpers<IRegForm>
  ) => {
    try {
      await axios.post("/auth/organizer/register", values);
      actions.resetForm();
      toast.success("register success!");
      router.push("/organizer/login");
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
                  className="absolute z-0 object-cover mt-[-50px]"
                  src={
                    "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744464384/wallpaperflare.com_wallpaper_k0pj1d.jpg"
                  }
                  alt="background"
                  width={1800}
                  height={720}
                />
              </div>
              <div className="flex justify-center mt-[30px] relative z-10">
                <div className="bg-white rounded-2xl border border-slate-500/10 shadow-md max-sm:w-[300px] sm:w-[300px] md:w-[400px] max-sm:ml-0 sm:ml-0 md:ml-0">
                  <div className="p-10 flex flex-col justify-center items-center gap-1">
                    <div>
                      <Image
                        className="hover:cursor-pointer hover:scale-110"
                        onClick={() => router.push("/")}
                        src={
                          "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744463709/logo_lwqsy2.png"
                        }
                        alt="motogp-logo"
                        width={200}
                        height={50}
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-[-20px]">
                      <div className="flex justify-center">
                        <h1 className="font-audio text-[25px]">ORGANIZER</h1>
                      </div>
                      <Field
                        name="email"
                        className="mt-[15px] border border-slate-500/5 w-[300px] text-black rounded-md shadow-md h-[50px] p-5 max-sm:w-[250px] sm:w-[250px] md:w-[320px]"
                        placeholder="email"
                      />
                      {touched.email && errors.email ? (
                        <div className="text-red-500">{errors.email}</div>
                      ) : null}
                      <Field
                        name="password"
                        type="password"
                        className="border border-slate-500/5 w-[300px] text-black rounded-md shadow-md h-[50px] p-5 max-sm:w-[250px] sm:w-[250px] md:w-[320px]"
                        placeholder="password"
                      />
                      {touched.password && errors.password ? (
                        <div className="text-red-500">{errors.password}</div>
                      ) : null}

                      <Field
                        name="username"
                        className="border border-slate-500/5 w-[300px] text-black rounded-md shadow-md h-[50px] p-5 max-sm:w-[250px] sm:w-[250px] md:w-[320px]"
                        placeholder="username"
                      />
                      {touched.username && errors.username ? (
                        <div className="text-red-500">{errors.username}</div>
                      ) : null}
                      <Field
                        name="fullname"
                        type="fullname"
                        className="border border-slate-500/5 w-[300px] text-black rounded-md shadow-md h-[50px] p-5 max-sm:w-[250px] sm:w-[250px] md:w-[320px]"
                        placeholder="fullname"
                      />
                      {touched.password && errors.password ? (
                        <div className="text-red-500">{errors.password}</div>
                      ) : null}
                      <p className="text-center text-gray-300 font-light text-[15px]">
                        People who use our service may have uploaded your
                        contact information to Moto GP.
                      </p>
                      <p className="text-center text-gray-300 font-light text-[15px]">
                        By signing up, you agree to our Terms , Privacy Policy
                        and Cookies Policy .
                      </p>
                      <button
                        type="submit"
                        onSubmit={() => router.push("/organizer/login")}
                        className="bg-red-400 text-white w-[300px] h-[50px] rounded-md shadow-md hover:cursor-pointer hover:bg-red-300 max-sm:w-[250px] sm:w-[250px] md:w-[320px]"
                      >
                        {isSubmitting ? "loading" : "Register"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center relative z-10">
                <div className="bg-white border rounded-2xl w-[400px] border-slate-500/10 mt-[25px] ml-[-100px] shadow-md max-sm:ml-0 sm:ml-0 md:ml-0">
                  <div className="text-black flex justify-center items-center gap-3 p-3">
                    <p>Sudah punya akun?</p>
                    <p
                      onClick={() => router.push("/organizer/login")}
                      className="font-bold text-red-500 hover:cursor-pointer"
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
