import Link from "next/link";
import { FC } from "react";
import { FaUserDoctor } from "react-icons/fa6";

interface IProps {
  link: string;
  title: string;
  description: string;
}

const LandingCard: FC<IProps> = ({ link, title, description }) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow px-6 py-8">
      <div className="flex flex-col items-center">
        <FaUserDoctor className="h-14 w-14" />

        <h5 className="mt-6 mb-3 text-xl font-medium text-gray-900">{title}</h5>
        <span className="text-sm text-center text-gray-500">{description}</span>
        <div className="flex mt-4 md:mt-6">
          <Link
            href={link}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingCard;
