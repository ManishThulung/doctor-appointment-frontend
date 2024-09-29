"use client";

import { useGetHospitalById } from "@/api/hospital.api";
import moment from "moment";
import React, { FC } from "react";
import { NormalSkeleton } from "../loaders/normal-skeleton";
import { PdfRenderModal } from "../modals/pdf-render-modal";
import { CarouselPlugin } from "../carousel";
import { useGetDoctorsCountOfHospital } from "@/api/doctor.api";

interface IProps {
  hospitalId: string;
}

const AboutHospital: FC<IProps> = ({ hospitalId }) => {
  const { data, isPending } = useGetHospitalById(hospitalId);
  const { data: doctorCount, isPending: doctorCountPending } =
    useGetDoctorsCountOfHospital(hospitalId);

  const currentDate = moment();
  const yearsElapsed =
    data && currentDate.diff(moment(data?.joinedAt), "years");

  if (isPending) {
    return <NormalSkeleton />;
  }
  return (
    <>
      {!isPending && data && (
        <>
          <section className="py-24 relative">
            <div className="w-full px-4 md:px-5 lg:px-5 mx-auto">
              <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
                <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                  <div className="w-full flex-col justify-center items-start gap-8 flex">
                    <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                      <h6 className="text-gray-400 text-base font-normal leading-relaxed">
                        About Us
                      </h6>
                      <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                        <h2 className="text-back text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                          The Tale of Our Achievement Story
                        </h2>
                        <p className="text-gray-700 text-base font-normal leading-relaxed lg:text-start text-center">
                          Our achievement story is a testament to teamwork and
                          perseverance. Together, we&apos;ve overcome
                          challenges, celebrated victories, and created a
                          narrative of progress and success.
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex-col justify-center items-start gap-6 flex">
                      <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                        <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                          <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">
                            {yearsElapsed ? yearsElapsed : 1}+ Years
                          </h4>
                          <p className="text-gray-500 text-base font-normal leading-relaxed">
                            Providing Digital Health Services
                          </p>
                        </div>
                        <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                          <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">
                            {doctorCount?.verifiedDoctor}+ Doctors
                          </h4>
                          <p className="text-gray-500 text-base font-normal leading-relaxed">
                            Excellence and Certified Doctors
                          </p>
                        </div>
                      </div>
                      <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                        <div className="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                          <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">
                            26+ Patients
                          </h4>
                          <p className="text-gray-500 text-base font-normal leading-relaxed">
                            Happy and satisfied Patients Admitted
                          </p>
                        </div>
                        <div className="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                          <h4 className="text-gray-900 text-2xl font-bold font-manrope leading-9">
                            99% Happy Clients
                          </h4>
                          <p className="text-gray-500 text-base font-normal leading-relaxed">
                            Mirrors our Focus on Client Satisfaction.
                          </p>
                        </div>
                      </div>
                      {data?.certificate && (
                        <PdfRenderModal
                          src={data?.certificate[0].filename}
                          text="See legit documents of the hospital"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full lg:justify-start justify-center items-start flex">
                  <div className=" w-full h-full  rounded-3xl">
                    <img
                      className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl"
                      src="https://pagedone.io/asset/uploads/1717742431.png"
                      alt="about Us image"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full m-auto mt-20">
              <p className="text-black text-4xl text-center font-bold my-4">
                Our Galleries
              </p>
              <CarouselPlugin gallery={data?.gallery} />
            </div>
          </section>

          <section className="bg-gray-100">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
              <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Our Address and Location
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="mt-16 lg:mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
                      width="100%"
                      height="480"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div>
                    <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                      <div className="px-6 py-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Our Address
                        </h3>
                        <p className="mt-1 text-gray-600">
                          {data?.Address?.wardNo} {data?.Address?.wardName},{" "}
                          {data?.Address?.municipality},{" "}
                          {data?.Address?.district}, {data?.Address?.province},{" "}
                          {data?.Address?.country},
                        </p>
                      </div>
                      <div className="border-t border-gray-200 px-6 py-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Hours
                        </h3>
                        <p className="mt-1 text-gray-600">
                          Monday - Friday: 9am - 5pm
                        </p>
                        <p className="mt-1 text-gray-600">
                          Saturday: 10am - 4pm
                        </p>
                        <p className="mt-1 text-gray-600">Sunday: Closed</p>
                      </div>
                      <div className="border-t border-gray-200 px-6 py-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Contact
                        </h3>
                        <p className="mt-1 text-gray-600">
                          Email: {data?.email}
                        </p>
                        <p className="mt-1 text-gray-600">
                          Phone: {data?.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AboutHospital;
