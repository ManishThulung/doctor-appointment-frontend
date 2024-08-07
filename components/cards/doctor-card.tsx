import { Address } from "@/types/address.types";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface IProps {
  name: string;
  id: string;
  email: string;
  image: string;
  specialization: string;
  address: Address;
}

const DoctorCard: FC<IProps> = ({
  name,
  id,
  email,
  image,
  address,
  specialization,
}) => {
  return (
    <Link
      href={`/doctors/${id}`}
      className="flex items-center w-fit justify-center"
    >
      <div className="max-w-xs">
        <div className="bg-white shadow-xl rounded-lg py-3">
          <div className="photo-wrapper p-2">
            <Image
              className="w-32 h-32 rounded-full mx-auto object-cover"
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`}
              alt={name}
              width={128}
              height={128}
            />
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
              {name}
            </h3>
            <div className="text-center text-gray-400 text-xs font-semibold">
              <p>{specialization[0]}</p>
            </div>
            <table className="text-xs my-3">
              <tbody>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Address
                  </td>
                  <td className="px-2 py-2">
                    {address?.municipality + ", " + address?.district}
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Phone
                  </td>
                  <td className="px-2 py-2">+977 9955221114</td>
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
