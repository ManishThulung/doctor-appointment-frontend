"use client";

import { sidebarMenus } from "@/components/sidebar";
import Sidebar from "@/components/sidebar/Sidebar";
import { useAuthContext } from "@/context/auth-provider";
import { Role } from "@/types/enums.types";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { role } = useAuthContext();

  const filteredMenu = sidebarMenus
    .filter((menu) => menu.roles.includes(role as Role))
    .map((menu) => {
      if (menu.children && menu.children.length > 0) {
        return {
          ...menu,
          children: menu.children.filter((subMenu) =>
            subMenu.roles.includes(role as Role)
          ),
        };
      }
      return menu;
    });
  return (
    <div className="flex h-screen bg-transparent">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex h-full">
          <nav className="flex w-[380px] h-full !bg-blue-500">
            <div className="w-full flex mx-auto px-6 py-8">
              <div className="w-full h-full flex justify-center text-gray-900 text-xl">
                <Sidebar menu={filteredMenu} />
              </div>
            </div>
          </nav>

          <main className="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
            <div className="flex w-full mx-auto px-6 py-8">
              <div className="flex flex-col w-full h-full text-gray-900 text-xl">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
