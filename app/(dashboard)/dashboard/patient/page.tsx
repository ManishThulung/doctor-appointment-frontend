"use client";
import { useGetAppointments } from "@/api/appointment";
import { createColumn } from "@/components/dashboards/table/create-columns";
import { DataTable } from "@/components/dashboards/table/data-table";
import { useAuthContext } from "@/context/auth-provider";
import { AppointmentStatus, Role } from "@/types/enums.types";
import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "antd";
import React from "react";

interface IDoctor {
  patientName: string;
  doctorName: string;
  patientGender: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}

const columns: ColumnDef<IDoctor>[] = [
  createColumn("patientName", "Patient Name"),
  createColumn("patientGender", "Patient Gender"),
  createColumn("doctorName", "Doctor Name"),
  createColumn("date", "Date"),
  createColumn("time", "Time"),
  createColumn("status", "Status"),
];

const Patient = () => {
  const { role } = useAuthContext();
  const { data, isPending } = useGetAppointments(role as Role);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Skeleton />
      </div>
    );
  }

  const serelizeData = () => {
    if (data?.success) {
      const newData = data?.appointments?.map((appointment: any) => {
        return {
          id: appointment?.id,
          date: appointment?.date,
          time: appointment?.timeSlot,
          status: appointment?.status,
          patientName: appointment?.User?.name,
          patientGender: appointment?.User?.gender ?? "N/A",
          doctorName: appointment?.Doctor?.name,
        };
      });
      return newData;
    }
  };

  const serelizedData = data && serelizeData();

  return (
    <>
      {data && serelizedData && (
        <>
          <div className="w-full mx-auto py-10">
            <DataTable
              columns={columns}
              data={serelizedData}
              filterBy="patientName"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Patient;
