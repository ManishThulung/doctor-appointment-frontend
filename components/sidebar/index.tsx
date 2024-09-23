import { Role } from "@/types/enums.types";
import { FaStar } from "react-icons/fa";
export const sidebarMenus = [
  {
    label: "Dashboard",
    path: "/",
    icon: <FaStar />,
    roles: [Role.SuperAdmin, Role.Admin, Role.Doctor],
  },
  {
    label: "Department",
    path: "department",
    icon: <FaStar />,
    roles: [Role.SuperAdmin],
  },
  {
    label: "Hospital",
    path: "hospital",
    icon: <FaStar />,
    roles: [Role.SuperAdmin],
  },
  {
    label: "Doctor",
    path: "doctor",
    icon: <FaStar />,
    roles: [Role.Admin],
  },

  {
    label: "Appointment",
    path: "appointment",
    icon: <FaStar />,
    roles: [Role.Admin, Role.Doctor],
    children: [
      {
        label: "Hospitals",
        path: Role.Doctor,
        icon: <FaStar />,
        roles: [Role.Admin],
      },
      {
        label: "hahas",
        path: Role.Doctor,
        icon: <FaStar />,
        roles: [Role.Admin, Role.Doctor],
      },
    ],
  },
  {
    label: "Patient",
    path: "patient",
    icon: <FaStar />,
    roles: [Role.Admin, Role.Doctor],
  },
];
