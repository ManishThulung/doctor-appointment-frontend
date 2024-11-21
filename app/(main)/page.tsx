"use client";

import { useGetDoctors } from "@/api/doctor.api";
import { useGetHospitals } from "@/api/hospital.api";
import DoctorCard from "@/components/cards/doctor-card";
import HospitalCard from "@/components/cards/hospital-card";
import LandingCard from "@/components/cards/landing-card";
import ServiceCard from "@/components/cards/service-card";
import { MultipleCardSkeleton } from "@/components/loaders/multiple-card-skeleton";
import Rocommedations from "@/components/rocommedations";
import Image from "next/image";
import { Fragment } from "react";

export default function Home() {
  const { data, isPending } = useGetHospitals();
  const { data: doctorData, isPending: isPendingDoctor } = useGetDoctors();

  return (
    <Fragment>
      <main className="max-md:hidden">
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
            <Image
              alt="hero"
              src="/assets/images/about.jpg"
              quality={100}
              width={250}
              height={150}
              unoptimized
              className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-xl rounded-lg -mt-64 h-[500px] object-cover"
            />
          </div>
        </section>
      </main>

      {/* get started */}
      <section className="my-10 md:mt-10 md:mb-20 mx-4">
        <div className="flex gap-8 md:gap-16 flex-col bg-white md:flex-row mx-4 w-[full] lg:w-3/4 md:m-auto">
          <h1 className="text-3xl font-semibold w-full md:w-[48%] flex items-center">
            Experience Exceptional Healthcare In Nepal With Us
          </h1>

          <p className="font-normal text-gray-700 w-full md:w-[48%]">
            Discover the pinnacle of healthcare services in the United States,
            where advancements, quality, cutting edge research, expert doctors
            and a commitment to patient success, combine to provide an
            unparalleled medical tourism experience. Omnicure Nepal is your
            dedicated partner, guiding you towards improved health and wellness.
            Connect with us today and embark on a journey of exceptional Nepal
            healthcare services.
          </p>
        </div>

        <div className="flex gap-6 flex-wrap justify-center mt-12">
          <LandingCard
            link="#"
            title="Explore"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nihil
          quo sapiente. Eveniet, deserunt molestiae quas ab facilis laudantium
          dignissimos doloremque illum."
          />
          <LandingCard
            link="/doctors"
            title="Doctors"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nihil
          quo sapiente. Eveniet, deserunt molestiae quas ab facilis laudantium
          dignissimos doloremque illum."
          />
          <LandingCard
            link="/hospitals"
            title="Hospitals"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nihil
          quo sapiente. Eveniet, deserunt molestiae quas ab facilis laudantium
          dignissimos doloremque illum."
          />
        </div>
      </section>
      {/* top hospitals */}
      <div>
        <p className="font-bold text-2xl lg:text-3xl text-center mb-4">
          Hospitals
        </p>
        <div className="flex gap-5 flex-wrap justify-center mx-4">
          {!isPending && data ? (
            data?.map((item: any) => (
              <HospitalCard
                key={item.id}
                name={item.name}
                phone={item?.phone}
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

      {/* two */}
      <div className="my-16">
        <div className="flex flex-col gap-8 mx-auto max-sm:mx-4 sm:w-3/4 lg:w-1/2 mb-10">
          <h2 className="text-3xl font-semibold text-center">
            We are always ready to help you
          </h2>
          <p className="text-base text-center w-full">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
            aliquid odit cupiditate quas, expedita accusantium commodi beatae
            mollitia facere soluta?
          </p>
        </div>
        <div className="flex justify-center lg:justify-between flex-wrap">
          <div className="w-full max-w-sm bg-white ">
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-28 h-28 rounded-full shadow-lg object-cover"
                src="/assets/images/about.jpg"
                alt="Bonnie image"
              />
              <h5 className=" text-2xl font-semibold text-gray-900 mt-4 lg:mt-8">
                Emergency Help
              </h5>
              <span className="text-base text-gray-500 mt-2 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo quis error ut temporibus, doloribus omnis vero!
              </span>
            </div>
          </div>
          <div className="w-full max-w-sm bg-white ">
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-28 h-28 rounded-full shadow-lg object-cover"
                src="/assets/images/about.jpg"
                alt="Bonnie image"
              />
              <h5 className=" text-2xl font-semibold text-gray-900 mt-4 lg:mt-8">
                Enriched Pharmecy
              </h5>
              <span className="text-base text-gray-500 mt-2 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo quis error ut temporibus, doloribus omnis vero!
              </span>
            </div>
          </div>
          <div className="w-full max-w-sm bg-white ">
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-28 h-28 rounded-full shadow-lg object-cover"
                src="/assets/images/about.jpg"
                alt="Bonnie image"
              />
              <h5 className=" text-2xl font-semibold text-gray-900 mt-4 lg:mt-8">
                Medical Treatment
              </h5>
              <span className="text-base text-gray-500 mt-2 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo quis error ut temporibus, doloribus omnis vero!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* top doctors */}
      <div>
        <p className="font-bold text-2xl lg:text-3xl text-center mb-4">
          Doctors
        </p>
        <div className="flex gap-5 flex-wrap justify-center mx-4">
          {!isPendingDoctor && doctorData ? (
            doctorData?.map((item: any) => (
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
            <div className="my-16">
              <MultipleCardSkeleton />
            </div>
          )}
        </div>
      </div>

      {/* services */}
      <div className="my-20">
        <div className="flex flex-col gap-8 mx-auto max-sm:mx-4 sm:w-3/4 lg:w-1/2 mb-12">
          <h2 className="text-3xl font-semibold text-center">
            We offer different to improve your health
          </h2>
          <p className="text-base text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
            aliquid odit cupiditate quas beatae mollitia facere soluta?
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mx-4">
          <ServiceCard
            title="General Treatment"
            desc="Here are the biggest enterprise technology acquisitions of 2024 so
          far, in reverse chronological order."
          />
          <ServiceCard
            title="Advancements in Telemedicine"
            desc="Explore how telemedicine is revolutionizing patient care with remote diagnostics, virtual consultations, and digital health monitoring."
          />
          <ServiceCard
            title="Breakthroughs in Cancer Treatment"
            desc="Learn about the latest breakthroughs in cancer therapies, including immunotherapy, gene editing, and personalized medicine."
          />

          <ServiceCard
            title="The Future of Medical Wearables"
            desc="Discover how wearable devices are transforming healthcare, offering real-time monitoring of vital signs, glucose levels, and heart rhythms."
          />

          <ServiceCard
            title="AI in Medical Diagnostics"
            desc="Uncover the role of artificial intelligence in improving diagnostic accuracy for diseases like Alzheimer's, diabetes, and cardiovascular conditions."
          />

          <ServiceCard
            title="Gene Therapy: A New Era of Medicine"
            desc="Explore the cutting-edge world of gene therapy, offering potential cures for genetic disorders like cystic fibrosis, hemophilia, and muscular dystrophy."
          />
        </div>
      </div>

      <div>
        <Rocommedations />
      </div>
    </Fragment>
  );
}
