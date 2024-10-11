"use client";

import { useApproveHospital, useGetHospitalsAdmin } from "@/api/hospital.api";
import { createColumn } from "@/components/dashboards/table/create-columns";
import { DataTable } from "@/components/dashboards/table/data-table";
import { CardSkeleton } from "@/components/loaders/card-skeleton";
import GenericlModal from "@/components/modals/generic-model";
import ViewDetailModal from "@/components/modals/view-modal";
import { ImageData } from "@/types/utils.types";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useState } from "react";

interface IHospital {
  name: string;
  certificate: ImageData;
  email: string;
  phone: string;
  pan: string;
  address: string;
  isVerified: boolean;
  action?: any;
}
const columns: ColumnDef<IHospital>[] = [
  createColumn("name", "Name"),
  createColumn("email", "Email"),
  createColumn("phone", "Phone"),
  createColumn("pan", "PAN"),
  createColumn("address", "Address"),
  createColumn("isVerified", "IsVerified"),
  createColumn("action", "Action"),
];

const Hospital = () => {
  const { data, isPending } = useGetHospitalsAdmin();
  const { mutateAsync, isPending: isLoadingApprove } = useApproveHospital();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);
  const [hospitalId, setHospitalId] = useState<string | null>(null);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <CardSkeleton />
      </div>
    );
  }

  const approveHospital = (id: string) => {
    setIsApproveModalOpen(true);
    setHospitalId(id);
  };
  const viewDetails = (id: string) => {
    setIsOpen(true);
    setHospitalId(id);
  };

  const serelizeData = () => {
    if (data) {
      const newData = data?.map((doctor: any) => {
        return {
          id: doctor?.id,
          name: doctor?.name,
          email: doctor?.email,
          phone: doctor?.phone,
          pan: doctor?.pan,
          isVerified: doctor?.isVerified,
          address: `${doctor?.Address?.municipality}, ${doctor?.Address?.district}`,
          action: [
            {
              label: "View Details",
              callback: () => viewDetails(doctor?.id),
            },
            {
              label: "Approve",
              callback: () => approveHospital(doctor?.id),
            },
          ],
        };
      });
      return newData;
    }
  };

  const serelizedData = data && serelizeData();

  const serelizeDisplayData = () => {
    if (data && hospitalId) {
      const hospital = data?.find(
        (hospital: any) => hospital.id === hospitalId
      );
      const newData = {
        id: hospital?.id,
        name: hospital?.name,
        email: hospital?.email,
        phone: hospital?.phone,
        address: hospital?.Address,
        pan: hospital?.pan,
        isVerified: hospital?.isVerified,
        certificate: hospital?.certificate,
      };

      return newData;
    }
  };

  const hospitalData = serelizeDisplayData();

  return (
    <>
      {data && (
        <>
          <div className="flex justify-between flex-row">
            <h2 className="font-semibold text-3xl">Hospitals</h2>
          </div>
          <div className="w-full mx-auto py-10">
            <DataTable
              columns={columns}
              data={serelizedData ?? []}
              filterBy="name"
            />
          </div>
        </>
      )}

      {isOpen && (
        <ViewDetailModal
          setIsOpen={setIsOpen}
          data={hospitalData}
          type={"Hospital"}
        />
      )}

      {isApproveModalOpen && (
        <GenericlModal
          setIsOpen={setIsApproveModalOpen}
          setAppointmentId={setHospitalId}
          appointmentId={hospitalId}
          mutateAsync={mutateAsync}
          isLoading={isLoadingApprove}
          type={"Approve"}
        />
      )}
    </>
  );
};

export default Hospital;
