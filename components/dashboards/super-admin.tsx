"use client";
import { useGetHospitalsCount } from "@/api/hospital.api";
import { useAuthContext } from "@/context/auth-provider";
import { Role } from "@/types/enums.types";
import Image from "next/image";
import React from "react";
import { StatCard } from "../cards/stat-card";
import { Skeleton } from "antd";
import { useGetDoctorsCount } from "@/api/doctor.api";

const Dashboard = () => {
  const { role } = useAuthContext();
  const isSuperAdmin = role === Role.SuperAdmin;
  const isAdmin = role === Role.Admin;

  const { data, isLoading } = useGetHospitalsCount(isSuperAdmin);

  const { data: doctorCount, isLoading: isAdminLoading } =
    useGetDoctorsCount(isAdmin);
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Image
          src="/assets/icons/logo-full.svg"
          height={32}
          width={162}
          alt="logo"
          className="h-8 w-fit"
        />

        <p className="text-16-semibold">{role} Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing your dashboard
          </p>
        </section>
        <>
          {isSuperAdmin && (
            <>
              {!isLoading && data ? (
                <section className="admin-stat">
                  <StatCard
                    type="hospitals"
                    count={data?.verifiedHospital}
                    label="Verified hospitals"
                    icon={"/assets/icons/appointments.svg"}
                    to="/dashboard/hospital"
                  />
                  <StatCard
                    type="pending"
                    count={data?.pendingHospital}
                    label="Pending hospitals"
                    icon={"/assets/icons/pending.svg"}
                    to="/dashboard/hospital"
                  />
                  <StatCard
                    type="departments"
                    count={5}
                    label="Departments"
                    icon={"/assets/icons/cancelled.svg"}
                    to="/dashboard/department"
                  />
                </section>
              ) : (
                <div className="flex gap-8">
                  <Skeleton className="h-40 w-40" />
                  <Skeleton className="h-40 w-40" />
                  <Skeleton className="h-40 w-40" />
                </div>
              )}
            </>
          )}
        </>
        <>
          {isAdmin && (
            <>
              {!isAdminLoading && doctorCount ? (
                <section className="admin-stat">
                  <StatCard
                    type="hospitals"
                    count={doctorCount?.verifiedDoctor}
                    label="Verified Doctors"
                    icon={"/assets/icons/appointments.svg"}
                    to="/dashboard/doctor"
                  />
                  <StatCard
                    type="pending"
                    count={doctorCount?.pendingDoctor}
                    label="Pending Doctors"
                    icon={"/assets/icons/pending.svg"}
                    to="/dashboard/doctor"
                  />
                  <StatCard
                    type="departments"
                    count={5}
                    label="Departments"
                    icon={"/assets/icons/cancelled.svg"}
                    to="/dashboard/department"
                  />
                </section>
              ) : (
                <div className="flex gap-8">
                  <Skeleton className="h-40 w-40" />
                  <Skeleton className="h-40 w-40" />
                  <Skeleton className="h-40 w-40" />
                </div>
              )}
            </>
          )}
        </>
      </main>
    </div>
  );
};

export default Dashboard;
