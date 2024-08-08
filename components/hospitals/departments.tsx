"use client";
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import * as S from "@/styles/department";
import { useDepartment } from "@/components/hooks/use-department";
// import CommingSoonTag from "../comming-soon/CommingSoonTag";
import { Link as ScrollLink, Element } from "react-scroll";

export const FUNCTIONALITIES = [
  {
    id: "cloud-phone",
    title: "Cloud Phone",
    commingSoon: false,
    subtitle: "Cloud Phone System to Enhance Productivity",
    description:
      "Elevate your communication with a cloud phone system as it is a versatile, scalable solution to enhance productivity and drive efficiency. ",
    img: "about.jpg",
  },
  {
    id: "virtual-call-center",
    title: "Virtual Call Center",
    commingSoon: false,
    subtitle: "Virtual Call Center at Fingertips ",
    description:
      "Set up a virtual phone system for high-quality customer support. Call monitoring, queue management, and real-time analytics make every customer interaction count.",
    img: "about.jpg",
  },
  {
    id: "mass-mailing",
    title: "Bulk SMS",
    commingSoon: true,
    subtitle: "Enhance Connectivity with Bulk SMS",
    description:
      "Communicate effectively with customers and scale businesses with Bulk SMS functionality. Send promotional messages, alerts, and reminders to improve customer engagement with personalized messaging.",
    img: "about.jpg",
  },
  {
    id: "customer-service",
    title: "Customer Service",
    commingSoon: false,
    subtitle: "Elevate Customer Service to New Heights",
    description:
      "Calilio is designed to enhance your customer service through the best VoIP phone services. Its rich VoIP features provide a seamless communication experience. Access exceptional customer service and be there for your customers when they need you most.",
    img: "about.jpg",
  },
  {
    id: "work-remotely",
    title: "Work Remotely",
    commingSoon: false,
    subtitle: "Operate From Anywhere You Are",
    description:
      "Embrace the freedom of location independence with our business phone system. Stay connected, responsive, and productive no matter where you are.",
    img: "about.jpg",
  },
];

const settings = {
  centerMode: true,
  slidesToShow: 1,
  speed: 500,
  dots: true,
  customPaging: (i: number) => <div>{FUNCTIONALITIES[i].title}</div>,
  appendDots: (dots: any) => (
    <div>
      <div className="overflow-x-auto">
        <ul>{dots}</ul>
      </div>
    </div>
  ),
  arrows: false,
  variableWidth: true,
  infinite: false,
};

const Departments = () => {
  const { activeNavIndex, functionalityRefs } = useDepartment();
  return (
    <div className="pt-12">
      <S.ContentWrapper className=" px-5 pb-[96px] pt-[96px] md:pt-[128px]  md:pb-0">
        <S.SectionWrapper>
          <span>Departments</span>
          <h2 className="text-3xl font-semibold lg:max-w-[927px]">
            We Offer Different Departments To Diagnose Your Diseases
            {/* <br className=" hidden md:inline-block" /> With Versatile VoIP */}
          </h2>
          <p className="lg:max-w-[927px]  text-white text-base font-normal">
            Experience the breadth of a business phone system with versatile
            VoIP services. From a cloud phone to bulk SMS capabilities, Calilio
            covers all your needs.
          </p>

          {/* //for mobile */}
          <S.SectionWrapper className="w-full md:hidden">
            <S.CustomSlider {...settings} className="md:hidden">
              {FUNCTIONALITIES.map((functionality, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center gap-8 md:gap-4 "
                >
                  <div className="h-[354px] md:px-5 max-[435px]:w-[390px] max-[376px]:w-[310px]  max-[330px]:w-[260px]">
                    <Image
                      className="h-full w-full object-cover"
                      src={`/assets/images/${functionality.img}`}
                      alt={functionality.title}
                      width={354}
                      height={390}
                      unoptimized
                    />
                  </div>
                  <div className=" flex flex-col md:ml-4 gap-[16px] max-[330px]:pb-[13px] max-[435px]:w-[390px] max-[426px]:w-[359px] max-[395px]:w-[320px]  max-[330px]:w-[270px]">
                    <span className="text-[#5964FF] text-[16px] leading-[24px] font-semibold font-inter">
                      {functionality.title}
                      {functionality.commingSoon &&
                        // <span className="font-semibold text-base text-[] bg-[] rounded-[4px] px-2 ml-3">
                        //   Comming Soon
                        // </span>
                        // <CommingSoonTag textColor="#0011FC" bgColor="#A3A9FF" />
                        "hii"}
                    </span>
                    <h3 className="text-white text-[30px] font-Inter leading-[36px] font-semibold max-[435px]:mb-2">
                      {functionality.subtitle}
                    </h3>
                    <p className="text-white leading-[28px] text-[18px] font-normal">
                      {functionality.description}
                    </p>
                  </div>
                </div>
              ))}
            </S.CustomSlider>
          </S.SectionWrapper>
          {/* big csreen */}
          <S.SliderNavigation className="hidden md:flex sticky top-[96px] z-10">
            {FUNCTIONALITIES.map((functionality, index) => (
              <ScrollLink
                key={index}
                to={`${functionality.id}`}
                className={index === activeNavIndex ? "active" : ""}
              >
                {functionality.title}
              </ScrollLink>
            ))}
          </S.SliderNavigation>
          <div className="hidden xl:gap-[96px] 2xl:gap-[128px] md:flex md:gap-6 md:min-[1920px]:-mt-[100px]">
            <div className="w-full xl:w-[524px]">
              {FUNCTIONALITIES.map((functionality, index) => {
                return (
                  <S.SectionWrapper
                    key={functionality.id}
                    ref={functionalityRefs[index] as any}
                    id={functionality.id}
                    className={`flex flex-col justify-center sm:h-[78vh] ${
                      index === FUNCTIONALITIES.length - 1
                        ? "mb-20 sm:mb-[280px]"
                        : ""
                    }`}
                  >
                    <span className="mx-0 mr-auto text-base leading-6">
                      {functionality.title}
                      {functionality.commingSoon &&
                        // <CommingSoonTag textColor="#0011FC" bgColor="#A3A9FF" />
                        "hii"}
                    </span>
                    <h3 className="text-left 3xl:text-5xl 3xl:leading-[60px] sm:text-4xl text-3xl mt-4 mb-8 font-semibold mx-0">
                      {functionality.subtitle}
                    </h3>
                    <div>
                      <p className="3xl:text-2xl 3xl:leading-[32px] sm:text-xl text-lg text-white">
                        {functionality.description}
                      </p>
                    </div>
                    <div className="block sm:hidden max-w-[350px] w-full mx-auto mt-5">
                      <Image
                        src={`/assets/images/${functionality.img}`}
                        alt={functionality.title}
                        width={628}
                        height={572}
                        style={{
                          width: "auto",
                          height: "auto",
                        }}
                        // unoptimized
                      />
                    </div>
                  </S.SectionWrapper>
                );
              })}
            </div>
            <div className="hidden sm:flex w-full 3xl:max-w-full xl:w-[628px] h-screen  flex-col justify-center sticky top-0">
              {FUNCTIONALITIES.map((functionality, index) => (
                <div key={functionality.id} className="w-fit h-fit absolute">
                  <Image
                    src={`/assets/images/${functionality.img}`}
                    alt={functionality.title}
                    width={628}
                    height={572}
                    style={{
                      opacity: index === activeNavIndex ? 1 : 0,
                      width: "auto",
                      height: "auto",
                      transition: "all 0.3s ease-in-out",
                    }}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </S.SectionWrapper>
      </S.ContentWrapper>
    </div>
  );
};

export default Departments;
