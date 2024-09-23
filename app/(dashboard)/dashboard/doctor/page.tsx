"use client";

import { useGetDoctorByHospitalIdAdmin } from "@/api/doctor.api";
import CreateDepartment from "@/components/dashboards/forms/create-department";
import { createColumn } from "@/components/dashboards/table/create-columns";
import { DataTable } from "@/components/dashboards/table/data-table";
import { CardSkeleton } from "@/components/loaders/card-skeleton";
import { ImageData } from "@/types/utils.types";
import { ColumnDef } from "@tanstack/react-table";
import { NextPage } from "next";

interface IDoctor {
  name: string;
  avatar: ImageData;
  isEmailVerified: boolean;
  isVerified: boolean;
  action?: any;
}

export const columns: ColumnDef<IDoctor>[] = [
  createColumn("avatar", "Avatar"),
  createColumn("name", "Name"),
  createColumn("isEmailVerified", "IsEmailVerified"),
  createColumn("isVerified", "IsVerified"),
  createColumn("action", "Action"),
];

const Doctor: NextPage = () => {
  const { data, isPending } = useGetDoctorByHospitalIdAdmin();
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <CardSkeleton />
      </div>
    );
  }

  return (
    <>
      {data && (
        <>
          <div className="flex justify-between flex-row">
            <h2 className="font-semibold text-3xl">Department</h2>
            <CreateDepartment />
          </div>
          <div className="w-full mx-auto py-10">
            <DataTable<IDoctor, any>
              columns={columns}
              data={data}
              filterBy="name"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Doctor;
