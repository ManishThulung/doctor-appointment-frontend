"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-provider";
import Link from "next/link";
import Userbar from "../cards/user-bar";
import { navItems } from "./constant";
import Drawer from "../drawer";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { isAuth } = useAuthContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawer = () => {
    setIsDrawerOpen(true);
  };
  return (
    <>
      <div className="sm:hidden my-8 mx-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Mero Doctor
          </span>
        </Link>

        <FaBars
          className=" cursor-pointer sm:h-3 sm:w-2 md:w-6 lg:w-8 h-4 w-8 md:h-8 "
          onClick={handleDrawer}
        />
      </div>

      <div className="max-w-[1440px] m-auto max-sm:hidden">
        <nav className="bg-white border-gray-200">
          <div className="flex flex-wrap items-center justify-between py-4">
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Mero Doctor
              </span>
            </Link>

            <div className="items-center justify-between hidden w-full md:flex md:w-auto">
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.path}
                      className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                      aria-current="page"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {isAuth ? (
              <Userbar />
            ) : (
              <div className="flex gap-4">
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
      <Drawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        position="left"
        xValue={-400}
        width="300px"
      >
        <div className="my-10 mx-6">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Mero Doctor
            </span>
          </Link>
        </div>

        <div className=" flex-col items-center justify-center mx-6">
          <ul className="w-full flex-col text-[16px] scroll text-black font-bold">
            {navItems.map((item) => (
              <Link
                href={item.path}
                key={item.label}
                className="flex items-center hover:bg-[#ffffff38] mb-3"
              >
                <li className=" text-[16px]">{item.label}</li>
              </Link>
            ))}
          </ul>
          <div className="mt-6">
            {isAuth ? (
              <Userbar />
            ) : (
              <div className="flex gap-4">
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
