"use client";

import { useGetDoctors } from "@/api/doctor.api";
import { useGetHospitals } from "@/api/hospital.api";
import DoctorCard from "@/components/cards/doctor-card";
import HospitalCard from "@/components/cards/hospital-card";
import { MultipleCardSkeleton } from "@/components/loaders/multiple-card-skeleton";

export default function Home() {
  const { data, isPending } = useGetHospitals();
  const { data: doctorData, isPending: isPendingDoctor } = useGetDoctors();

  return (
    <div className="my-6 lg:my-12 flex flex-col gap-8 lg:gap-16">
      <div>
        <p className="font-bold text-2xl lg:text-3xl text-center mb-4">
          Top Hospitals
        </p>
        <div className="flex gap-5 flex-wrap justify-center">
          {!isPending && data ? (
            data?.map((item: any) => (
              <HospitalCard
                key={item.id}
                name={item.name}
                id={item.id}
                address={item.Address}
                email={item.email}
                image={item?.logo.filename}
              />
            ))
          ) : (
            <div className="my-16">
              <MultipleCardSkeleton />
            </div>
          )}
        </div>
      </div>
      <div>
        <p className="font-bold text-2xl lg:text-3xl text-center mb-4">
          Top Doctors
        </p>
        <div className="flex gap-5 flex-wrap justify-center">
          {!isPendingDoctor && doctorData ? (
            doctorData?.map((item: any) => (
              <DoctorCard
                key={item.id}
                name={item.name}
                id={item.id}
                address={item.Address}
                email={item.email}
                image={item?.avatar.filename}
                specialization={item?.specialization}
              />
            ))
          ) : (
            <div className="my-16">
              <MultipleCardSkeleton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
