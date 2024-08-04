"use client";

import React, { FC, ReactNode, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import LogoutModal from "../modals/logout-modal";

interface IMenu {
  label: string;
  path?: string;
  icon: ReactNode;
  roles: string[];
  children?: {
    label: string;
    path: string;
    icon: ReactNode;
  }[];
}
export interface ISidebarMenus {
  menu: IMenu[];
}

const Sidebar: FC<ISidebarMenus> = ({ menu }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (path: string) => {
    setSelectedItem(path);
  };
  return (
    <>
      <Accordion type="multiple" className="w-full">
        {menu &&
          menu.map((item, i) => (
            <AccordionItem
              key={`item-${i + 1}`}
              value={`item-${i + 1}`}
              className="border-none"
            >
              {item?.children && item?.children?.length > 0 ? (
                <>
                  {/* {item.icon} */}
                  <AccordionTrigger>
                    <div className="flex gap-3 items-center text-white">
                      {item.icon} {item.label}
                    </div>
                  </AccordionTrigger>
                  <div className="ml-7 ">
                    {item.children.map((subItem, i) => (
                      <AccordionContent
                        key={`subItem-${i + 1}`}
                        className={`flex gap-3 items-center text-white hover:bg-black m-auto ${
                          selectedItem === subItem.path ? "bg-gray-700" : ""
                        }`}
                        onClick={() => handleItemClick(subItem.path)}
                      >
                        {subItem.icon}
                        <Link href={`/dashboard/${subItem.path}`}>
                          {subItem.label}
                        </Link>
                      </AccordionContent>
                    ))}
                  </div>
                </>
              ) : (
                <div
                  className={`flex gap-3 items-center cursor-pointer py-2 text-white font-medium ${
                    selectedItem === item.path ? "bg-gray-700" : ""
                  }`}
                  onClick={() => handleItemClick(item.path!)}
                >
                  {item.icon}
                  <Link href={`/dashboard/${item.path}`}>{item.label}</Link>
                </div>
              )}
            </AccordionItem>
          ))}
        <LogoutModal type="dashboard" />
      </Accordion>
    </>
  );
};

export default Sidebar;
