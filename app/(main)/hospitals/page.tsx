"use client";

import { useGetHospitals } from "@/api/hospital.api";
import HospitalCard from "@/components/cards/hospital-card";
import { MultipleCardSkeleton } from "@/components/loaders/multiple-card-skeleton";

const Hospital = () => {
  const { data, isPending } = useGetHospitals();
  if (isPending) {
    return <MultipleCardSkeleton />;
  }
  return (
    <>
      <div className="flex gap-5 flex-wrap justify-center">
        {data &&
          data?.map((item: any) => (
            <HospitalCard
              key={item.id}
              name={item.name}
              id={item.id}
              address={item.Address}
              email={item.email}
              image={item?.logo.filename}
            />
          ))}
      </div>
    </>
  );
};

export default Hospital;
