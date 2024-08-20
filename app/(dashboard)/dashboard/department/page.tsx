"use client";

import { createColumn } from "@/components/dashboards/table/create-columns";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "../doctor/data-table";
import CreateDepartment from "@/components/dashboards/forms/create-department";
import { useGetDepartment } from "@/api/dashboard/department.api";
import { CardSkeleton } from "@/components/loaders/card-skeleton";
import { ImageData } from "@/types/utils.types";

interface IDepartment {
  name: string;
  image: ImageData;
  description: string;
  action?: any;
}
export const columns: ColumnDef<IDepartment>[] = [
  createColumn("image", "Image"),
  createColumn("name", "Name"),
  createColumn("description", "Description"),
  createColumn("action", "Action"),
];

const page = () => {
  const { data, isPending } = useGetDepartment();
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
            <DataTable columns={columns} data={data} filterBy="name" />
          </div>
        </>
      )}
    </>
  );
};

export default page;