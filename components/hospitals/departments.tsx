"use client";

import React from "react";
import Image from "next/image";
import { StickyScroll } from "../ui/sticky-scroll";
import { useGetDepartment } from "@/api/dashboard/department.api";
import { Skeleton } from "../ui/skeleton";

export function Departments() {
  const { data, isLoading } = useGetDepartment();

  if (isLoading) {
    return <Skeleton />;
  }

  const serializeData = (data: any) => {
    if (data && data?.length > 0) {
      return data.map((item: any) => ({
        title: item?.name,
        description: item?.description,
        content: (
          <div className="h-full w-full  flex items-center justify-center text-white">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item?.image.filename}`}
              width={300}
              height={300}
              className="h-full w-full object-cover"
              alt="linear board demo"
            />
          </div>
        ),
      }));
    }
  };

  const departmentData = data && serializeData(data);
  return (
    <div className="p-10">
      {data && departmentData && <StickyScroll content={departmentData} />}
    </div>
  );
}

export default Departments;
