"use client";

import { useGetHospitals } from "@/api/hospital.api";
import { createColumn } from "@/components/dashboards/table/create-columns";
import { CardSkeleton } from "@/components/loaders/card-skeleton";
import { ImageData } from "@/types/utils.types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../doctor/data-table";
import { useGetHospitalsAdmin } from "../../../../api/hospital.api";

interface IHospital {
  name: string;
  certificate: ImageData;
  email: string;
  phone: string;
  pan: string;
  isEmailVerified: boolean;
  isVerified: boolean;
  action?: any;
}
export const columns: ColumnDef<IHospital>[] = [
  createColumn("name", "Name"),
  createColumn("email", "Email"),
  createColumn("phone", "Phone"),
  createColumn("pan", "PAN"),
  createColumn("isEmailVerified", "IsEmailVerified"),
  createColumn("isVerified", "IsVerified"),
  createColumn("action", "Action"),
];

const page = () => {
  const { data, isPending } = useGetHospitalsAdmin();
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
            <h2 className="font-semibold text-3xl">Hospitals</h2>
          </div>
          <div className="w-full mx-auto py-10">
            <DataTable columns={columns} data={data} filterBy="name" />
          </div>
        </>
      )}
    </>
  );
};

export default page;
