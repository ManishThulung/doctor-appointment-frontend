"use client";

import Link from "next/link";
import { navItems } from "./constant";
import { Button } from "@/components/ui/button";
import Userbar from "../cards/user-bar";
import { useAuthContext } from "@/context/auth-provider";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { isAuth } = useAuthContext();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Check if window is defined to ensure we're in the browser
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('name');
      if (storedData) {
        setData(storedData);
      }
    }
  }, []);
  return (
    <div className="max-w-[1440px] m-auto">
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
            <Userbar name={data} />
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
  );
};

export default Navbar;
