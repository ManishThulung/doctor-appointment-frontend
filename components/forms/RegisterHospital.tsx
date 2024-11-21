"use client";

import { useGetDepartment } from "@/api/dashboard/department.api";
import { useRegisterHospital } from "@/api/hospital.api";
import { FileUploader } from "@/components/file-uploader";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HospitalRegisterFormDefaultValues, Types } from "@/constants";
import { HospitalFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse } from "axios";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";
import { z } from "zod";
import MultipleSelect from "../multiple-select";
import SubmitButton from "../submit-button";
import CustomFormField, { FormFieldType } from "./molecules/custom-fields";

const RegisterHospital = () => {
  const { mutateAsync, isPending } = useRegisterHospital();

  const { data: departmentData } = useGetDepartment();

  const serializeData = (data: any) => {
    const modifiedData = data.map((item: any) => {
      const value = item?.id;
      const label = item?.name;

      return { value, label };
    });
    return modifiedData;
  };
  let departmentOptions: any;
  if (departmentData) {
    departmentOptions = serializeData(departmentData);
  }

  const [department, setDepartment] = useState<any>({
    departments: [],
  });

  const form = useForm<z.infer<typeof HospitalFormValidation>>({
    resolver: zodResolver(HospitalFormValidation),
    defaultValues: {
      ...HospitalRegisterFormDefaultValues,
    },
  });

  const onSubmit = async (values: z.infer<typeof HospitalFormValidation>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type", values.type);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("phone", values.phone);
    formData.append("pan", values.pan);
    formData.append("country", values.country);
    formData.append("province", values.province);
    formData.append("district", values.district);
    formData.append("municipality", values.municipality);
    formData.append("wardName", values.wardName);
    formData.append("wardNo", values.wardNo);
    formData.append("departments", department?.departments);
    formData.append("logo", values?.logo[0]);
    formData.append("certificate", values?.certificate[0]);
    const galleryFiles = values?.gallery;

    if (galleryFiles && galleryFiles.length > 0) {
      galleryFiles.forEach((file) => {
        formData.append("gallery", file);
      });
    }

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
          <p className="text-dark-700">Register your hospital here with us.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Hospital Information</h2>
          </div>

          {/* NAME */}

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Name"
              placeholder="Alka Hospital Pvt. Ltd."
              iconSrc="/assets/icons/user.svg"
              iconAlt="user"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="type"
              label="Type"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {Types.map((option, i) => (
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

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="alkahospital@gmail.com"
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
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="pan"
              label="Pan number (Pan number of hospital)"
              placeholder="12324766798798"
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="logo"
            label="Hospital logo"
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
            <h2 className="sub-header">Hospital Address</h2>
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="country"
              label="Country"
              placeholder="Nepal"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="province"
              label="Province"
              placeholder="Bagmati"
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="district"
              label="District"
              placeholder="Kathmandu"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="municipality"
              label="Municipality"
              placeholder="Kathmandu Municipality"
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="wardName"
              label="Ward Name"
              placeholder="Hospital located ward name"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="wardNo"
              label="Ward Number"
              placeholder="Hospital located ward number"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verfication</h2>
          </div>

          {/* <CustomFormField
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
          </CustomFormField> */}

          <CustomFormField
            fieldType={FormFieldType.MULTIPLE_SELECT}
            control={form.control}
            name="departments"
            label="Select the departments"
            multipleSelect={(field) => (
              <FormControl>
                <MultipleSelect
                  formData={department}
                  setFormData={setDepartment}
                  options={departmentOptions}
                  fieldName="departments"
                />
              </FormControl>
            )}
          />
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

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gallery"
            label="Hospital photos"
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
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of this hospital for the registration purposes."
          />
        </section>

        <SubmitButton isPending={isPending}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterHospital;
