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
    path: "doctor",
    icon: <FaStar />,
    roles: ["super_admin", "admin"],
    children: [
      {
        label: "Hospitals",
        path: "doctor",
        icon: <FaStar />,
        roles: ["super_admin"],
      },
      {
        label: "Hospitals",
        path: "doctor",
        icon: <FaStar />,
        roles: ["super_admin", "admin"],
      },
    ],
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
