"use client";

import {
  useApproveDoctor,
  useGetDoctorByHospitalIdAdmin,
} from "@/api/doctor.api";
import { createColumn } from "@/components/dashboards/table/create-columns";
import { DataTable } from "@/components/dashboards/table/data-table";
import { CardSkeleton } from "@/components/loaders/card-skeleton";
import GenericlModal from "@/components/modals/generic-model";
import ViewDetailModal from "@/components/modals/view-modal";
import { ImageData } from "@/types/utils.types";
import { ColumnDef } from "@tanstack/react-table";
import { NextPage } from "next";
import { useState } from "react";

interface IDoctor {
  department: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
  avatar: ImageData;
  isVerified: boolean;
  action?: any;
}

const columns: ColumnDef<IDoctor>[] = [
  createColumn("department", "Department"),
  createColumn("avatar", "Avatar"),
  createColumn("name", "Name"),
  createColumn("gender", "Gender"),
  createColumn("email", "Email"),
  createColumn("phone", "Contact No."),
  createColumn("isVerified", "IsVerified"),
  createColumn("action", "Action"),
];

const DoctorDashboard: NextPage = () => {
  const { data, isPending } = useGetDoctorByHospitalIdAdmin();
  const { mutateAsync, isPending: isLoadingApprove } = useApproveDoctor();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <CardSkeleton />
      </div>
    );
  }

  const approveDoctor = (id: string) => {
    setIsApproveModalOpen(true);
    setDoctorId(id);
  };
  const viewDetails = (id: string) => {
    setIsOpen(true);
    setDoctorId(id);
  };

  const serelizeData = () => {
    if (data && data?.length > 0) {
      const newData = data?.map((doctor: any) => {
        return {
          id: doctor?.id,
          name: doctor?.name,
          avatar: doctor?.avatar,
          isVerified: doctor?.isVerified,
          department: doctor?.Department?.name,
          gender: doctor?.gender,
          email: doctor?.email,
          phone: doctor?.phone,
          action: [
            {
              label: "View Details",
              callback: () => viewDetails(doctor?.id),
            },
            {
              label: "Approve",
              callback: () => approveDoctor(doctor?.id),
            },
          ],
        };
      });
      return newData;
    }
  };

  const serelizedData = data && serelizeData();

  const serelizeDisplayData = () => {
    if (data && data?.length > 0 && doctorId) {
      const doctor = data?.find((doctor: any) => doctor.id === doctorId);
      const newData = {
        id: doctor?.id,
        name: doctor?.name,
        avatar: doctor?.avatar,
        isVerified: doctor?.isVerified,
        department: doctor?.Department?.name,
        gender: doctor?.gender,
        email: doctor?.email,
        phone: doctor?.phone,
        address: doctor?.address,
        certificate: doctor?.certificate,
      };

      return newData;
    }
  };

  const doctorData = data && serelizeDisplayData();
  return (
    <>
      {data && serelizedData && (
        <div className="w-full mx-auto py-10">
          <DataTable
            columns={columns}
            data={serelizedData ?? []}
            filterBy="name"
          />
        </div>
      )}

      {isOpen && data && (
        <ViewDetailModal
          setIsOpen={setIsOpen}
          data={doctorData}
          type={"Doctor"}
        />
      )}

      {isApproveModalOpen && (
        <GenericlModal
          setIsOpen={setIsApproveModalOpen}
          setAppointmentId={setDoctorId}
          appointmentId={doctorId}
          mutateAsync={mutateAsync}
          isLoading={isLoadingApprove}
          type={"Approve"}
        />
      )}
    </>
  );
};

export default DoctorDashboard;
