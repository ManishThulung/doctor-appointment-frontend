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
    roles: ["admin"],
  },

  {
    label: "Appointment",
    path: "appointment",
    icon: <FaStar />,
    roles: ["admin", "doctor"],
    children: [
      {
        label: "Hospitals",
        path: "doctor",
        icon: <FaStar />,
        roles: ["admin"],
      },
      {
        label: "hahas",
        path: "doctor",
        icon: <FaStar />,
        roles: ["admin", "doctor"],
      },
    ],
  },
  {
    label: "Patient",
    path: "patient",
    icon: <FaStar />,
    roles: ["admin", "doctor"],
  },
];
