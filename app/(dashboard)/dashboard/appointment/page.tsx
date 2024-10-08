"use client";
import {
  useApproveAppointmentByDoctor,
  useCancelAppointmentByDoctor,
  useGetAppointments,
  useStatusUpateAppointment,
} from "@/api/appointment";
import { createColumn } from "@/components/dashboards/table/create-columns";
import { DataTable } from "@/components/dashboards/table/data-table";
import CancelModal from "@/components/modals/cancel-modal";
import GenericlModal from "@/components/modals/generic-model";
import { useAuthContext } from "@/context/auth-provider";
import { AppointmentStatus } from "@/types/enums.types";
import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "antd";
import React from "react";
import { useState } from "react";

interface IAppointment {
  patientName: string;
  doctorName: string;
  patientGender: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  action: any;
}

const columns: ColumnDef<IAppointment>[] = [
  createColumn("patientName", "Patient Name"),
  createColumn("patientGender", "Patient Gender"),
  createColumn("doctorName", "Doctor Name"),
  createColumn("date", "Date"),
  createColumn("time", "Time"),
  createColumn("status", "Status"),
  createColumn("action", "Action"),
];

const Appointments = () => {
  const { role } = useAuthContext();
  const { data, isPending } = useGetAppointments(role);
  const { mutateAsync, isPending: isLoading } = useCancelAppointmentByDoctor();
  const { mutateAsync: mutateAsyncApprove, isPending: isLoadingApprove } =
    useApproveAppointmentByDoctor();
  const { mutateAsync: mutateAsyncStatus, isPending: isLoadingStatus } =
    useStatusUpateAppointment();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);
  const [isStatussModalOpen, setIsStatusModalOpen] = useState<boolean>(false);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Skeleton />
      </div>
    );
  }

  const approveAppointment = (id: string) => {
    setIsApproveModalOpen(true);
    setAppointmentId(id);
  };
  const cancelAppointment = (id: string) => {
    setIsOpen(true);
    setAppointmentId(id);
  };
  const updateStatus = (id: string) => {
    setIsStatusModalOpen(true);
    setAppointmentId(id);
  };

  const serelizeData = () => {
    if (data && data?.success) {
      const newData = data?.appointments?.map((appointment: any) => {
        return {
          id: appointment?.id,
          date: appointment?.date,
          time: appointment?.timeSlot,
          status: appointment?.status,
          patientName: appointment?.User?.name,
          patientGender: appointment?.User?.gender ?? "N/A",
          doctorName: appointment?.Doctor?.name,
          action: [
            {
              label: "Aprove",
              callback: () => approveAppointment(appointment?.id),
            },
            {
              label: "Update",
              callback: () => updateStatus(appointment?.id),
            },
            {
              label: "Cancel",
              callback: () => cancelAppointment(appointment?.id),
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
            <DataTable
              columns={columns}
              data={serelizedData ?? []}
              filterBy="patientName"
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

      {isApproveModalOpen && (
        <GenericlModal
          setIsOpen={setIsApproveModalOpen}
          setAppointmentId={setAppointmentId}
          appointmentId={appointmentId}
          mutateAsync={mutateAsyncApprove}
          isLoading={isLoadingApprove}
          type={"Approve"}
        />
      )}

      {isStatussModalOpen && (
        <GenericlModal
          setIsOpen={setIsStatusModalOpen}
          setAppointmentId={setAppointmentId}
          appointmentId={appointmentId}
          mutateAsync={mutateAsyncStatus}
          isLoading={isLoadingStatus}
          type={"Update"}
        />
      )}
    </>
  );
};

export default Appointments;
