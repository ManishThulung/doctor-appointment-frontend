"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import { DoctorFormDefaultValues, GenderOptions } from "@/constants";
import { DoctorFormValidation } from "@/lib/validation";
import { useGetDepartment } from "@/api/dashboard/department.api";
import { useCreateDoctor } from "@/api/doctor.api";
import { FileUploader } from "@/components/file-uploader";
import { AxiosResponse } from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import SubmitButton from "../submit-button";
import CustomFormField, { FormFieldType } from "./molecules/custom-fields";

const RegisterDoctor = () => {
  const { mutateAsync, isPending } = useCreateDoctor();

  const searchParams = useSearchParams();
  const hospitalId = searchParams.get("hospitalId");

  const { data: departmentData, isPending: departmentDataLoading } =
    useGetDepartment();

  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      ...DoctorFormDefaultValues,
    },
  });

  const onSubmit = async (values: z.infer<typeof DoctorFormValidation>) => {
    const formData = new FormData();
    hospitalId && formData.append("hospitalId", hospitalId);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("password", values.password);
    formData.append("dob", values.dob.toISOString()); // Convert Date to string if necessary
    formData.append("gender", values.gender);
    formData.append("address", values.address);
    formData.append("department", values.department);
    formData.append("avatar", values?.avatar[0]);
    formData.append("certificate", values?.certificate[0]);

    try {
      const res: AxiosResponse = await mutateAsync(formData);
      if (res.data?.success) {
        toast.success(res.data?.message);
        form.reset();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>

          {/* NAME */}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
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
          </div>

          {/* BirthDate & Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="dob"
              label="Date of birth"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          {/* Address & Occupation */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="14 street, New york, NY - 5101"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />
          </div>
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="avatar"
            label="Your photo"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader
                  files={field.value}
                  onChange={field.onChange}
                  type="image/*"
                />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verfication</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="department"
            label="Department"
            placeholder="Select a department you belong to"
          >
            {departmentData &&
              departmentData.map((department) => (
                <SelectItem key={department.id} value={department.id}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${department.image.filename}`}
                      width={32}
                      height={32}
                      alt="department"
                      className="rounded-full border object-cover w-8 h-8"
                    />
                    <p>{department.name}</p>
                  </div>
                </SelectItem>
              ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="certificate"
            label="Scanned Copy of Verified Document/Certificate"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader
                  files={field.value}
                  onChange={field.onChange}
                  type="application/pdf"
                />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for treatment purposes."
          />
        </section>

        <SubmitButton isPending={isPending}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterDoctor;
