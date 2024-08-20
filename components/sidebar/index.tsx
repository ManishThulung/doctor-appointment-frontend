import { Role } from "@/types/enums.types";
import { FaStar } from "react-icons/fa";
export const sidebarMenus = [
  {
    label: "Doctor",
    path: "doctor",
    icon: <FaStar />,
    roles: ["admin"],
  },
  {
    label: "Hospital",
    path: "hospital",
    icon: <FaStar />,
    roles: [Role.SuperAdmin],
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
  {
    label: "Department",
    path: "department",
    icon: <FaStar />,
    roles: [Role.SuperAdmin],
  },
];
