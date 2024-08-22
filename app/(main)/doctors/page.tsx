"use client";

import { useGetDoctors } from "@/api/doctor.api";
import DoctorCard from "@/components/cards/doctor-card";
import { MultipleCardSkeleton } from "@/components/loaders/multiple-card-skeleton";
import React from "react";

const page = () => {
  const { data, isPending } = useGetDoctors();
  if (isPending) {
    return <MultipleCardSkeleton />;
  }
  return (
    <div className="flex gap-5 flex-wrap justify-center">
      {data &&
        data?.map((item: any) => (
          <DoctorCard
            key={item.id}
            name={item.name}
            id={item.id}
            address={item.address}
            email={item.email}
            phone={item.phone}
            image={item?.avatar.filename}
            department={item?.Department?.name}
          />
        ))}
    </div>
  );
};

export default page;
