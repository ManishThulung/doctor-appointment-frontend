import HospitalLearnCard from "@/components/cards/hospital-learn-card";
import Departments from "@/components/hospitals/departments";
import GoogleMapLocation from "@/components/maps/google-map-location";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = ({ params }: { params: { hospitalId: string } }) => {
  const lat = 85.33501135; // New Latitude
  const lng = 27.699110100000002; // New Longitude
  return (
    <>
      <main>
        <section className="relative block h-[500px]">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
        </section>
        <section className="relative py-16 ">
          <div className="mx-auto px-4 w-3/4">
            <div className="relative flex gap-10 min-w-0  w-full rounded-lg -mt-36 h-auto">
              <HospitalLearnCard
                title="Emergency Cases"
                desc="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
                link="#"
              />
              <HospitalLearnCard
                title="Opening Hours"
                desc="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
                link="#"
              />
              <HospitalLearnCard
                title="Doctor Timetable"
                desc="Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
                link="#"
              />
            </div>
          </div>
        </section>

        <div className="bg-[#101828]">
          <Departments />
        </div>

        {/* register as a doctor */}
        <div className="flex bg-clip-border bg-white text-gray-700 w-full max-w-[48rem] flex-row m-auto py-16">
          <div className="w-2/5 m-0 overflow-hidden text-gray-700 bg-white bg-clip-border shrink-0">
            <Image
              src="/assets/images/about.jpg"
              alt="doctor"
              width={100}
              height={100}
              unoptimized
              className="object-cover w-full h-[200px]"
            />
          </div>
          <div className="p-6">
            <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
              Register as a doctor
            </h6>
            <p className="block mb-6 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
              Like so many organizations these days, Autodesk is a company in
              transition. It was until recently a traditional boxed software
              company selling licenses.
            </p>
            <Link
              href={{
                pathname: "/doctor/register",
                query: { hospitalId: params.hospitalId },
              }}
              className="inline-block"
            >
              <Button>
                Register here
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <GoogleMapLocation lat={lat} lng={lng} />
    </>
  );
};

export default page;
