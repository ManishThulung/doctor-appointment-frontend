import DoctorCard from "@/components/cards/doctor-card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="my-6 lg:my-12">
      <div>
        <p className="font-bold text-2xl lg:text-3xl text-center mb-4">Top Doctors</p>
        <div className="flex gap-5 flex-wrap justify-center">
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard />
        </div>
      </div>
    </div>
  );
}
