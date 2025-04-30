"use client";

import GesturesButton from "@/app/anim/gestures";
import axios from "@/lib/axios";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik"; 
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as yup from "yup";

const loginScheme = yup.object().shape({
  username: yup.string().required("Please input the username"),
  password: yup.string().required("Please use the correct Password"),
});

interface ILogForm {
  username: string;
  password: string;
}
// interface IProps {
//   onReload: () => void;
// }

export default function LoginForm() {
  const initialValues: ILogForm = {
    username: "",
    password: "",
  };
  const router = useRouter();
  const regUser = async (
    values: ILogForm,
    actions: FormikHelpers<ILogForm>
  ) => {
    try {
      const { data } = await axios.post("/auth/login", values);
      const user = data.data;

      await signIn("credentials", {
        redirectTo: "/",
        id: user.id,
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        avatar: user.avatar ?? "",
        accessToken: data.access_token,
        role: user.role,
        referral: user.referral,
        expiredAt: user.expiredAt
      });
      actions.resetForm();
      toast.success("login success!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "login failed");
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={loginScheme}
        onSubmit={regUser}
      >
        {(props: FormikProps<ILogForm>) => {
          const { errors, touched, isSubmitting } = props;
          return (
            <Form className="relative">
              <div>
                <Image
                  className="absolute z-0 object-cover h-screen"
                  src={
                    "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744464384/wallpaperflare.com_wallpaper_k0pj1d.jpg"
                  }
                  alt="background"
                  width={1800}
                  height={720}
                />
              </div>
              <div className="flex justify-center relative z-10 subpixel-antialiased">
                <div className="bg-black/70 mt-[100px] rounded-2xl border border-slate-500/10 shadow-md max-sm:w-[300px] sm:w-[300px] md:w-[400px] max-sm:ml-0 sm:ml-0 md:ml-0">
                  <div className="p-10 flex flex-col justify-center items-center gap-1">
                    <div>
                      <p
                        onClick={() => router.push("/")}
                        className="font-extrabold text-[50px] text-blue-400 drop-shadow-md/50 cursor-pointer"
                      >
                        GP.TIX
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 mt-[20px]">
                      <div className="flex justify-center">
                        <h1 className="font-audio text-white text-[25px]">
                          LOGIN
                        </h1>
                      </div>
                      <Field
                        name="username"
                        className="bg-slate-700 border border-slate-500/5 w-[300px] text-white rounded-md shadow-md h-[50px] p-5 max-sm:w-[250px] sm:w-[250px] md:w-[320px]"
                        placeholder="username"
                      />
                      {touched.username && errors.username ? (
                        <div className="text-red-500 font-bold">
                          {errors.username}
                        </div>
                      ) : null}
                      <Field
                        name="password"
                        type="password"
                        className="bg-slate-700 border border-slate-500/5 w-[300px] text-white rounded-md shadow-md h-[50px] p-5 max-sm:w-[250px] sm:w-[250px] md:w-[320px]"
                        placeholder="password"
                      />
                      {touched.password && errors.password ? (
                        <div className="text-red-500 font-bold">
                          {errors.password}
                        </div>
                      ) : null}
                      <GesturesButton>
                        <button
                          type="submit"
                          onSubmit={() => router.push("/login")}
                          className="bg-blue-950/70 border border-blue-500/50 text-white w-[300px] h-[50px] rounded-md shadow-md hover:cursor-pointer max-sm:w-[250px] sm:w-[250px] md:w-[320px]"
                        >
                          {isSubmitting ? "loading" : "Login"}
                        </button>
                      </GesturesButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center relative z-10">
                <div className="bg-black/70 border rounded-2xl w-[400px] border-slate-500/10 mt-[25px] ml-[-100px] shadow-md max-sm:ml-0 sm:ml-0 md:ml-0">
                  <div className="text-white flex justify-center items-center gap-3 p-3">
                    <p>Belum punya akun?</p>
                    <p
                      onClick={() => router.push("/register")}
                      className="font-bold text-blue-500 hover:cursor-pointer"
                    >
                      Register
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
