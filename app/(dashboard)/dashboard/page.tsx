"use client";

import SuperAdmin from "@/components/dashboards/super-admin";
import { useAuthContext } from "@/context/auth-provider";
import { Role } from "@/types/enums.types";

const Dashboard = () => {
  const { role } = useAuthContext();
  const isSuperAdmin = role === Role.SuperAdmin;
  const isAdmin = role === Role.Admin;
  return (
    <SuperAdmin/>
  );
};

export default Dashboard;
