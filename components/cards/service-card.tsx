import React from "react";
import { FaUserDoctor } from "react-icons/fa6";

const ServiceCard = ({title, desc}: {title: string, desc:string}) => {
  return (
    <div className="flex items-start bg-white flex-row md:max-w-lg sm:w-[45%] lg:w-[30%]">
      <div className="pt-1">
        <FaUserDoctor className="h-12 w-12" />
      </div>
      <div className="flex flex-col justify-between pl-6 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
