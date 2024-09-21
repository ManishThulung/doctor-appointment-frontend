import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { FC } from "react";
import LogoutModal from "../modals/logout-modal";

interface IProps {
  name?: string;
}
const Userbar: FC<IProps> = ({ name }) => {
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
            <MenubarRadioItem value="andy">
              {name == "ram" ? name : "hari"}
            </MenubarRadioItem>
            {/* <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem> */}
          </MenubarRadioGroup>
          <MenubarSeparator />
          {/* <MenubarItem className="cursor-pointer" inset>
            Edit...
          </MenubarItem>
          <MenubarSeparator /> */}
          <div className="pl-8">
            <LogoutModal type="user" />
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Userbar;
