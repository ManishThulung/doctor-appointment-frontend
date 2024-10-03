import { useGetUserProfile } from "@/api/auth.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarSeparator,
  MenubarTrigger
} from "@/components/ui/menubar";
import Link from "next/link";
import LogoutModal from "../modals/logout-modal";

const Userbar = () => {
  const { data } = useGetUserProfile();
  return (
    <Menubar className="border-none">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <div className="pl-2 py-1">{data && data?.data?.name}</div>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarRadioGroup value="benoit">
            <Link href={"appointments"} className="pl-2 py-1">
              Appointments
            </Link>
          </MenubarRadioGroup>
          <MenubarSeparator />

          <div className="pl-2">
            <LogoutModal type="user" />
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Userbar;
