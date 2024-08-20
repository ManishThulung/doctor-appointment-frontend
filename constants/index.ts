import { Certificate } from "crypto";

export const GenderOptions = ["Male", "Female", "Other"];

export const Types = ["Clinic", "Hospital"];

export const DoctorFormDefaultValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  dob: new Date(Date.now()),
  gender: undefined,
  address: "",
  avatar: [],
  department: "",
  identificationDocument: [],
  disclosureConsent: false,
};

export const HospitalRegisterFormDefaultValues = {
  name: "",
  type: "",
  email: "",
  password: "",
  phone: "",
  pan: "",
  country: "",
  province: "",
  district: "",
  municipality: "",
  wardName: "",
  wardNo: "",
  logo: [],
  Certificate: [],
  gallery: [],
  disclosureConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
