import { Address } from "@/types/address.types";
import { Rate } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface IProps {
  name: string;
  id: string;
  email: string;
  phone: string;
  image: string;
  department: string;
  address: string;
  rating?: any;
}

const DoctorCard: FC<IProps> = ({
  name,
  id,
  email,
  image,
  phone,
  address,
  department,
  rating,
}) => {
  function roundDownToNearestHalf(number: number) {
    return Math.floor(number * 2) / 2;
  }
  return (
    <Link
      href={`/doctors/${id}`}
      className="flex items-center w-fit justify-center"
    >
      <div className="max-w-xs w-[17rem]">
        <div className="bg-white shadow-xl rounded-lg py-3">
          <div className="photo-wrapper p-2">
            <Image
              className="w-32 h-32 rounded-full mx-auto object-cover"
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`}
              alt={name}
              width={128}
              height={128}
              property="1"
            />
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
              {name}
            </h3>
            <div className="text-center text-gray-400 text-xs font-semibold">
              {department}
            </div>
            <table className="text-xs my-3">
              <tbody>
                {rating && (
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Rating
                    </td>
                    <td className="px-2 py-2">
                      <Rate
                        allowHalf
                        defaultValue={roundDownToNearestHalf(Number(rating))}
                        disabled
                      />
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Address
                  </td>
                  <td className="px-2 py-2">{address}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Phone
                  </td>
                  <td className="px-2 py-2">{phone}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Email
                  </td>
                  <td className="px-2 py-2">{email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;
