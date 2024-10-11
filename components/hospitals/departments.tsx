// "use client";
// /* eslint-disable @next/next/no-img-element */
// import Image from "next/image";

// import * as S from "@/styles/department";
// import { useDepartment } from "@/components/hooks/use-department";
// // import CommingSoonTag from "../comming-soon/CommingSoonTag";
// import { Link as ScrollLink, Element } from "react-scroll";
// import { useGetDepartment } from "@/api/dashboard/department.api";

// interface IDepartmentData {
//   id: string;
//   subtitle: string;
//   description: string;
//   img: string;
// }

// const Departments = () => {
//   const { activeNavIndex, functionalityRefs } = useDepartment();
//   const { data } = useGetDepartment();

//   const serializeData = (data: any) => {
//     const modifiedData = data.map((item: any) => {
//       const id = item?.id;
//       const subtitle = item?.name;
//       const description = item?.description;
//       const img = item?.image.filename;

//       return { id, subtitle, description, img };
//     });
//     return modifiedData;
//   };
//   let departmentOptions: IDepartmentData[] = data && serializeData(data);

//   const settings = {
//     centerMode: true,
//     slidesToShow: 1,
//     speed: 500,
//     dots: true,
//     customPaging: (i: number) => <div>{departmentOptions[i].subtitle}</div>,
//     appendDots: (dots: any) => (
//       <div>
//         <div className="overflow-x-auto">
//           <ul>{dots}</ul>
//         </div>
//       </div>
//     ),
//     arrows: false,
//     variableWidth: true,
//     infinite: false,
//   };

//   return (
//     <div className="pt-12">
//       <S.ContentWrapper className=" px-5 pb-[96px] pt-[96px] md:pt-[128px]  md:pb-0">
//         <S.SectionWrapper>
//           <span>Departments</span>
//           <h2 className="text-3xl font-semibold lg:max-w-[927px]">
//             We Offer Different Departments To Diagnose Your Diseases
//             {/* <br className=" hidden md:inline-block" /> With Versatile VoIP */}
//           </h2>
//           <p className="lg:max-w-[927px]  text-white text-base font-normal">
//             Experience the breadth of a business phone system with versatile
//             VoIP services. From a cloud phone to bulk SMS capabilities, Calilio
//             covers all your needs.
//           </p>

//           {/* //for mobile */}
//           <S.SectionWrapper className="w-full md:hidden">
//             <S.CustomSlider {...settings} className="md:hidden">
//               {departmentOptions &&
//                 departmentOptions.map((functionality, index) => (
//                   <div
//                     key={index}
//                     className="flex flex-col justify-center gap-8 md:gap-4 "
//                   >
//                     <div className="h-[354px] md:px-5 max-[435px]:w-[390px] max-[376px]:w-[310px]  max-[330px]:w-[260px]">
//                       <Image
//                         className="h-full w-full object-cover"
//                         src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${functionality.img}`}
//                         alt={functionality.subtitle}
//                         width={354}
//                         height={390}
//                         unoptimized
//                       />
//                     </div>
//                     <div className=" flex flex-col md:ml-4 gap-[16px] max-[330px]:pb-[13px] max-[435px]:w-[390px] max-[426px]:w-[359px] max-[395px]:w-[320px]  max-[330px]:w-[270px]">
//                       <h3 className="text-white text-[30px] font-Inter leading-[36px] font-semibold max-[435px]:mb-2">
//                         {functionality.subtitle}
//                       </h3>
//                       <p className="text-white leading-[28px] text-[18px] font-normal">
//                         {functionality.description}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//             </S.CustomSlider>
//           </S.SectionWrapper>
//           {/* big csreen */}
//           <S.SliderNavigation className="hidden md:flex sticky top-[96px] z-10">
//             {departmentOptions &&
//               departmentOptions.map((functionality, index) => (
//                 <ScrollLink
//                   key={index}
//                   to={`${functionality.id}`}
//                   className={index === activeNavIndex ? "active" : ""}
//                 >
//                   {functionality.subtitle}
//                 </ScrollLink>
//               ))}
//           </S.SliderNavigation>

//           <div className="hidden xl:gap-[96px] 2xl:gap-[128px] md:flex md:gap-6 md:min-[1920px]:-mt-[100px]">
//             <div className="w-full xl:w-[524px]">
//               {departmentOptions &&
//                 departmentOptions.map((functionality, index) => {
//                   return (
//                     <S.SectionWrapper
//                       key={functionality.id}
//                       ref={functionalityRefs[index] as any}
//                       id={functionality.id}
//                       className={`flex flex-col justify-center sm:h-[78vh] ${
//                         index === departmentOptions.length - 1
//                           ? "mb-20 sm:mb-[280px]"
//                           : ""
//                       }`}
//                     >
//                       <h3 className="text-left 3xl:text-5xl 3xl:leading-[60px] sm:text-4xl text-3xl mt-4 mb-8 font-semibold mx-0">
//                         {functionality.subtitle}
//                       </h3>
//                       <div>
//                         <p className="3xl:text-2xl 3xl:leading-[32px] sm:text-xl text-lg text-white">
//                           {functionality.description}
//                         </p>
//                       </div>
//                       <div className="block sm:hidden max-w-[350px] w-full mx-auto mt-5">
//                         <Image
//                           src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${functionality.img}`}
//                           alt={functionality.subtitle}
//                           width={628}
//                           height={572}
//                           style={{
//                             width: "auto",
//                             height: "auto",
//                           }}
//                           // unoptimized
//                         />
//                       </div>
//                     </S.SectionWrapper>
//                   );
//                 })}
//             </div>
//             <div className="hidden sm:flex w-full 3xl:max-w-full xl:w-[628px] h-screen  flex-col justify-center sticky top-0">
//               {departmentOptions &&
//                 departmentOptions.map((functionality, index) => (
//                   <div key={functionality.id} className="w-fit h-fit absolute">
//                     <Image
//                       src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${functionality.img}`}
//                       alt={functionality.subtitle}
//                       width={628}
//                       height={572}
//                       style={{
//                         opacity: index === activeNavIndex ? 1 : 0,
//                         width: "auto",
//                         height: "auto",
//                         transition: "all 0.3s ease-in-out",
//                       }}
//                     />
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </S.SectionWrapper>
//       </S.ContentWrapper>
//     </div>
//   );
// };

// export default Departments;

import Image from "next/image";
import * as S from "@/styles/department";
import { useDepartment } from "@/components/hooks/use-department";
import { Link as ScrollLink } from "react-scroll";
import { useGetDepartment } from "@/api/dashboard/department.api";

interface IDepartmentData {
  id: string;
  subtitle: string;
  description: string;
  img: string;
}

const Departments = () => {
  const { activeNavIndex, addRef } = useDepartment();
  const { data } = useGetDepartment();

  const serializeData = (data: any) => {
    return data.map((item: any) => ({
      id: item?.id,
      subtitle: item?.name,
      description: item?.description,
      img: item?.image.filename,
    }));
  };

  const departmentOptions: IDepartmentData[] = data ? serializeData(data) : [];

  const settings = {
    centerMode: true,
    slidesToShow: 1,
    speed: 500,
    dots: true,
    customPaging: (i: number) => <div>{departmentOptions[i].subtitle}</div>,
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

  return (
    <div className="pt-12">
      <S.ContentWrapper className="px-5 pb-[96px] pt-[96px] md:pt-[128px] md:pb-0">
        <S.SectionWrapper>
          <span>Departments</span>
          <h2 className="text-3xl font-semibold lg:max-w-[927px]">
            We Offer Different Departments To Diagnose Your Diseases
          </h2>
          <p className="lg:max-w-[927px] text-white text-base font-normal">
            Experience the breadth of a business phone system with versatile
            VoIP services. From a cloud phone to bulk SMS capabilities, Calilio
            covers all your needs.
          </p>

          {/* Mobile View */}
          <S.SectionWrapper className="w-full md:hidden">
            <S.CustomSlider {...settings}>
              {departmentOptions.map((functionality, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center gap-8"
                >
                  <div className="h-[354px] md:px-5">
                    <Image
                      className="h-full w-full object-cover"
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${functionality.img}`}
                      alt={functionality.subtitle}
                      width={354}
                      height={390}
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col gap-[16px]">
                    <h3 className="text-white text-[30px] font-semibold">
                      {functionality.subtitle}
                    </h3>
                    <p className="text-white text-[18px]">
                      {functionality.description}
                    </p>
                  </div>
                </div>
              ))}
            </S.CustomSlider>
          </S.SectionWrapper>

          {/* Desktop Navigation */}
          <S.SliderNavigation className="hidden md:flex sticky top-[96px] z-10">
            {departmentOptions.map((functionality, index) => (
              <ScrollLink
                key={index}
                to={functionality.id}
                className={index === activeNavIndex ? "active" : ""}
              >
                {functionality.subtitle}
              </ScrollLink>
            ))}
          </S.SliderNavigation>

          {/* Desktop Content */}
          <div className="hidden md:flex gap-6">
            <div className="w-full xl:w-[524px]">
              {departmentOptions.map((functionality, index) => (
                <S.SectionWrapper
                  key={functionality.id}
                  ref={(el) => {
                    if (el) addRef(el);
                  }}
                  id={functionality.id}
                  className={`flex flex-col justify-center ${
                    index === departmentOptions.length - 1 ? "mb-20" : ""
                  }`}
                >
                  <h3 className="text-left text-3xl mt-4 mb-8 font-semibold">
                    {functionality.subtitle}
                  </h3>
                  <p className="text-lg text-white">
                    {functionality.description}
                  </p>
                </S.SectionWrapper>
              ))}
            </div>
            <div className="w-full xl:w-[628px] h-screen flex-col justify-center sticky top-0">
              {departmentOptions.map((functionality, index) => (
                <div key={functionality.id} className="absolute">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${functionality.img}`}
                    alt={functionality.subtitle}
                    width={628}
                    height={572}
                    style={{
                      opacity: index === activeNavIndex ? 1 : 0,
                      transition: "all 0.3s ease-in-out",
                    }}
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
