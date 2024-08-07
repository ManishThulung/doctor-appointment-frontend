import React from "react";
import { FaUserDoctor } from "react-icons/fa6";

const ServiceCard = () => {
  return (
    <div className="flex flex-col items-start bg-white md:flex-row md:max-w-lg  w-[30%]">
      <div className="pt-1">
        <FaUserDoctor className="h-12 w-12" />
      </div>
      <div className="flex flex-col justify-between pl-6 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          General Treatment
        </h5>
        <p className="mb-3 font-normal text-gray-700">
          Here are the biggest enterprise technology acquisitions of 2024 so
          far, in reverse chronological order.
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
