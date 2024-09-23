"use client";

import { useGetDoctorById } from "@/api/doctor.api";
import { useGetReviewsByDoctorId } from "@/api/review";
import ReviewCard from "@/components/cards/review-card";
import { CardSkeleton } from "@/components/loaders/card-skeleton";
import AppointmenntModal from "@/components/modals/appointment-modal";
import { PdfRenderModal } from "@/components/modals/pdf-render-modal";
import ReviewModal from "@/components/modals/review-modal";
import { Rate } from "antd";
import Image from "next/image";

const DoctorPage = ({ params }: { params: { doctorId: string } }) => {
  const { data, isPending } = useGetDoctorById(params.doctorId);
  const { data: reviewData, isPending: isPendingReviews } =
    useGetReviewsByDoctorId(params.doctorId);

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
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
           <div className="max-w-[1300px] mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              {!isPending && data ? (
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full h-40 lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <Image
                          alt={data?.name}
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.avatar?.filename}`}
                          className="shadow-xl rounded-full h-[150px] align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px] object-cover"
                          width={250}
                          height={250}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center flex gap-5 flex-wrap justify-end">
                      <AppointmenntModal
                        doctorId={params.doctorId}
                        hospitalId={data?.HospitalId}
                      />
                      <ReviewModal type="Doctor" doctorId={params.doctorId} />
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        {/* <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            22
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Friends
                          </span>
                        </div> */}
                        <div className="mr-4 p-3 text-center">
                          <Rate allowHalf defaultValue={4} disabled />
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          {data?.certificate && (
                            <PdfRenderModal src={data?.certificate?.filename} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                      {data?.name}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      {data?.address}
                    </div>
                    <div className="mb-2 text-blueGray-600 mt-5">
                      <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                      {data?.Department?.name}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                      {data?.Hospital?.name}
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Esse, ab voluptatem. Aperiam, necessitatibus?
                          Cumque est magnam tempore delectus omnis impedit
                          reprehenderit, inventore earum, obcaecati aliquam
                          laborum! Dolorem architecto quae cupiditate!
                        </p>
                        <a href="#pablo" className="font-normal text-pink-500">
                          Show more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="my-8 m-auto">
                  <CardSkeleton />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-6 flex-wrap mt-20">
            {/* <Suspense fallback={<CardSkeleton />}>
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
            </Suspense> */}
            {reviewData &&
              reviewData?.map((review: any) => <ReviewCard key={review.id} review={review}/>)}
          </div>
        </section>
      </main>
    </>
  );
};

export default DoctorPage;
