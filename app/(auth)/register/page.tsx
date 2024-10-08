"use client";

import { useRegister } from "@/api/auth.api";
import CustomFormField, {
  FormFieldType,
} from "@/components/forms/molecules/custom-fields";
import SubmitButton from "@/components/submit-button";
import { RegisterFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Form } from "@/components/ui/form";

export type RegistrationFormFields = {
  password: string;
  email: string;
  name: string;
};

const Register = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useRegister();

  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterFormValidation>) => {
    try {
      const res: AxiosResponse = await mutateAsync(values);
      if (res.data && res?.data?.success) {
        toast.success(res.data?.message);
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? "Something went wrong, try again"
      );
    }
  };

  return (
    <>
      <div className="bg-white md:h-screen">
        <div className="grid md:grid-cols-2 items-center gap-8 h-full">
          <div className="flex items-center md:p-8 p-6 bg-transparent h-full lg:w-11/12 lg:ml-auto">
            <div className="md:max-w-md w-full px-4 py-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="max-w-lg w-full mx-auto"
                >
                  <div className="mb-12">
                    <h3 className="text-gray-800 text-3xl font-extrabold">
                      Sign up
                    </h3>
                    <p className="text-sm mt-4 text-gray-800">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                      >
                        login here
                      </Link>
                    </p>
                    <p className="text-sm mt-4 text-gray-800">
                      Register your hospital?{" "}
                      <Link
                        href="/hospital/register"
                        className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                      >
                        click here
                      </Link>
                    </p>
                  </div>

                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                  />

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
                  <div className="mt-6">
                    <SubmitButton isPending={isPending}>Register</SubmitButton>
                  </div>
                </form>
              </Form>

              <div className="space-x-6 flex justify-center mt-6 w-full">
                <button
                  type="button"
                  className="cursor-pointer border-none outline-none w-full bg-slate-200 py-2 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32px"
                    className="inline"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#fbbd00"
                      d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    />
                    <path
                      fill="#0f9d58"
                      d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    />
                    <path
                      fill="#31aa52"
                      d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    />
                    <path
                      fill="#3c79e6"
                      d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    />
                    <path
                      fill="#cf2d48"
                      d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    />
                    <path
                      fill="#eb4132"
                      d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="max-md:order-1 p-4">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="lg:max-w-[85%] w-full h-full object-contain block mx-auto"
              alt="login-image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
