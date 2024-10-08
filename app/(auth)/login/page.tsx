"use client";

import { useLogin } from "@/api/auth.api";
import CustomFormField, {
  FormFieldType,
} from "@/components/forms/molecules/custom-fields";
import SubmitButton from "@/components/submit-button";
import { Form } from "@/components/ui/form";
import { useAuthContext } from "@/context/auth-provider";
import { LoginFormValidation } from "@/lib/validation";
import { Role } from "@/types/enums.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export type LoginFormFields = {
  password: string;
  email: string;
};

const Login = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useLogin();
  const { setIsAuth, setRole } = useAuthContext();

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginFormValidation>) => {
    try {
      const res: AxiosResponse = await mutateAsync(values);
      if (res.data?.success && res?.data?.user?.role) {
        setIsAuth(res.data?.success);
        setRole(res?.data?.user?.role);
        if (res?.data?.user?.role === Role.SuperAdmin) {
          // router.push("/dashboard");
          if (typeof window != "undefined") {
            window.location.reload();
            window.location.href = "/dashboard";
          }
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      // setCookie("isLogged", "false");
      setIsAuth(false);
      toast.error(error.response.data.message);
    }
  };

  const handleLogin = async () => {
    // Retrieve Google Authentication url from the server
    const url = (
      await axios.get("http://localhost:8000/api/auth/redirect/oauth")
    ).data;
    console.log(url, "urllllll");

    // Redirect to the Google Authentication page
    window.location.href = url;
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4  rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex-1 space-y-12"
              >
                <div className="mb-12">
                  <h3 className="text-gray-800 text-3xl font-extrabold">
                    Sign in
                  </h3>
                  <p className="text-sm mt-4 text-gray-800">
                    Don&apos;t have an account
                    <Link
                      href="/register"
                      className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                    >
                      Register here
                    </Link>
                  </p>
                  <p className="text-sm mt-4 text-gray-800">
                    Log in as a hopital admin
                    <Link
                      href="/hospital/login"
                      className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                    >
                      Click here
                    </Link>
                  </p>
                  <p className="text-sm mt-4 text-gray-800">
                    Log in as a doctor
                    <Link
                      href="/doctor/login"
                      className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                    >
                      Click here
                    </Link>
                  </p>
                </div>

                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="email"
                  label="Email address"
                  placeholder="johndoe@gmail.com"
                  iconSrc="/assets/icons/email.svg"
                  iconAlt="email"
                />

                <CustomFormField
                  fieldType={FormFieldType.PASSWORD}
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="Enter a new password"
                />

                <SubmitButton isPending={isPending}>Log in</SubmitButton>
              </form>
            </Form>

            <div className="space-x-6 flex justify-center mt-6">
              <button onClick={handleLogin}>Sign in with Google 🚀 </button>
            </div>
          </div>

          <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="w-full h-full object-contain"
              alt="login-image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
