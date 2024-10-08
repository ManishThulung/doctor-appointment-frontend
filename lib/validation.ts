import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const DoctorFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  password: z
    .string()
    .min(4, "password must be at least 4 characters")
    .max(15, "password must be at most 15 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,13}$/.test(phone), "Invalid phone number"),
  dob: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  department: z.string().min(9, "Department is required"),
  // avatar: z.custom<File[]>(
  //   (value) => {
  //     // Ensure it's an array of files
  //     if (!Array.isArray(value)) return false;
  //     // Ensure each item in the array is a File
  //     return value.every((item) => item instanceof File);
  //   },
  //   {
  //     message: "Avatar is required",
  //   }
  // ),
  avatar: z.array(z.instanceof(File)).nonempty("Image is required"),
  certificate: z
    .array(z.instanceof(File))
    .nonempty("Document/certificate is required"),

  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
});

export const HospitalFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  type: z.string().min(1, { message: "This is required" }),
  password: z
    .string()
    .min(4, "password must be at least 4 characters")
    .max(15, "password must be at most 15 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,13}$/.test(phone), "Invalid phone number"),
  pan: z.string().min(1, { message: "This is required" }),
  country: z.string().min(1, { message: "This is required" }),
  province: z.string().min(1, { message: "This is required" }),
  district: z.string().min(1, { message: "This is required" }),
  municipality: z.string().min(1, { message: "This is required" }),
  wardName: z.string().min(1, { message: "This is required" }),
  wardNo: z.string().min(1, { message: "This is required" }),
  logo: z.array(z.instanceof(File)).nonempty("Image is required"),
  certificate: z
    .array(z.instanceof(File))
    .nonempty("Document/certificate is required"),
  gallery: z
    .array(z.instanceof(File))
    .nonempty("Document/certificate is required"),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

export const LoginFormValidation = z.object({
  password: z
    .string()
    .min(4, "password must be at least 4 characters")
    .max(15, "password must be at most 15 characters"),
  email: z.string().email("Invalid email address"),
});

export const namePattern = {
  value: new RegExp("^[A-Za-z][A-Za-zs]*$"),
  message: "Name must only include valid words.",
};

export const passwordPattern = {
  value: /^(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{4,}$/,
  message:
    "Password must include one special character and be at least 4 characters long.",
};

// export const emailPattern: any = {
//   value: new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$", "ig"),
//   message: "Enter a valid email address.",
// };

export const RegisterFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .regex(namePattern.value, namePattern.message),
  password: z
    .string()
    .min(4, "password must be at least 4 characters")
    .max(15, "password must be at most 15 characters")
    .regex(passwordPattern.value, passwordPattern.message),
  email: z.string().email("Invalid email address"),
});
