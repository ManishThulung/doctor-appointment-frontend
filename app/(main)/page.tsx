import DoctorCard from "@/components/cards/doctor-card";
import HospitalCard from "@/components/cards/hospital-card";
import { cookies } from "next/headers";
import Image from "next/image";

export default function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  console.log(token, "token");
  return (
    <div className="my-6 lg:my-12">
      {/* {token && token} */}
      <div>
        <p className="font-bold text-2xl lg:text-3xl text-center mb-4">
          Top Hospitals
        </p>
        <div className="flex gap-5 flex-wrap justify-center">
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
        </div>
      </div>
      <div>
        <p className="font-bold text-2xl lg:text-3xl text-center mb-4">
          Top Doctors
        </p>
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
          <DoctorCard />
        </div>
      </div>
    </div>
  );
}
