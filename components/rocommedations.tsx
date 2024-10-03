"use client";

import React from "react";
import { MultipleCardSkeleton } from "./loaders/multiple-card-skeleton";
import DoctorCard from "./cards/doctor-card";
import { useGetDoctorRecommedations } from "@/api/doctor.api";
import { useAuthContext } from "@/context/auth-provider";

const Rocommedations = () => {
  const { isAuth } = useAuthContext();
  const { data, isPending } = useGetDoctorRecommedations();
  if (isPending) {
    return <MultipleCardSkeleton />;
  }
  return (
    <div>
      {isAuth && (
        <>
          <h1 className="text-3xl my-6">Recommendations</h1>
          <div className="flex gap-5 flex-wrap justify-center">
            {data && data?.algorithm
              ? data?.topDoctors?.map((item: any) => (
                  <DoctorCard
                    key={item?.id}
                    name={item?.name}
                    id={item?.id}
                    address={item?.address}
                    email={item?.email}
                    phone={item?.phone}
                    image={item?.avatar.filename}
                    department={item?.Department?.name}
                    rating={item?.average_rating}
                  />
                ))
              : data?.topDoctors?.map((item: any) => (
                  <DoctorCard
                    key={item?.Doctor?.DoctorId}
                    name={item?.Doctor?.name}
                    id={item?.Doctor?.id}
                    address={item?.Doctor?.address}
                    email={item?.Doctor?.email}
                    phone={item?.Doctor?.phone}
                    image={item?.Doctor?.avatar.filename}
                    department={item?.Doctor?.Department?.name}
                    rating={item?.average_rating}
                  />
                ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Rocommedations;
