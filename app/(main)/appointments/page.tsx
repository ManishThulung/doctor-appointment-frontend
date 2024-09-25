"use client";
import {
  useCancelAppointment,
  useGetAppointments,
  useGetMyAppointments,
} from "@/api/appointment";
import { createColumn } from "@/components/dashboards/table/create-columns";
import { DataTable } from "@/components/dashboards/table/data-table";
import CancelModal from "@/components/modals/cancel-modal";
import { useAuthContext } from "@/context/auth-provider";
import { AppointmentStatus } from "@/types/enums.types";
import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "antd";
import { useState } from "react";

interface IAppointment {
  hospitalName: string;
  doctorName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  action: any;
}

export const columns: ColumnDef<IAppointment>[] = [
  createColumn("hospitalName", "Hospital Name"),
  createColumn("doctorName", "Doctor Name"),
  createColumn("date", "Date"),
  createColumn("time", "Time"),
  createColumn("status", "Status"),
  createColumn("action", "Action"),
];

const MyAppointments = () => {
  const { data, isPending } = useGetMyAppointments();
  const { mutateAsync, isPending: isLoading } = useCancelAppointment();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Skeleton />
      </div>
    );
  }

  const confirmCancel = (id: string) => {
    setIsOpen(true);
    setAppointmentId(id);
  };

  const serelizeData = () => {
    if (data?.success) {
      const newData = data?.appointments?.map((appointment: any) => {
        return {
          id: appointment?.id,
          date: appointment?.date,
          time: appointment?.timeSlot,
          status: appointment?.status,
          hospitalName: appointment?.Hospital?.name,
          doctorName: appointment?.Doctor?.name,
          action: [
            {
              label: "Cancel",
              callback: () => confirmCancel(appointment?.id),
            },
          ],
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
            <DataTable<IAppointment, any>
              columns={columns}
              data={serelizedData}
              filterBy="name"
            />
          </div>
        </>
      )}

      {isOpen && (
        <CancelModal
          setIsOpen={setIsOpen}
          setAppointmentId={setAppointmentId}
          appointmentId={appointmentId}
          mutateAsync={mutateAsync}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default MyAppointments;
