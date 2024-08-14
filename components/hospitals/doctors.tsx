"use client";

import { useGetDoctorByHospitalId } from "@/api/doctor.api";
import DoctorCard from "../cards/doctor-card";

const Doctors = ({ hospitalId }: { hospitalId: string }) => {
  const { data } = useGetDoctorByHospitalId(hospitalId);
  return (
    <div className="my-12 lg:my-20">
      <p className="font-bold text-2xl lg:text-3xl text-center mb-4">
        Top Doctors
      </p>
      <div className="flex gap-5 flex-wrap justify-center">
        {data && data.length >= 1 ? (
          data?.map((item: any) => (
            <DoctorCard
              key={item.id}
              name={item.name}
              id={item.id}
              address={item?.address}
              email={item.email}
              image={item?.avatar.filename}
              phone={item?.phone}
              department={item?.Department?.name}
            />
          ))
        ) : (
          <div className="my-16 text-black">No data found</div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
