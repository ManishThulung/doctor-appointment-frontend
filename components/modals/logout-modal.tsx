"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";
import { BiLogOutCircle } from "react-icons/bi";

interface IProps {
  type: "dashboard" | "user";
}

const LogoutModal: FC<IProps> = ({ type }) => {
  const handleLogout = async () => {
    // cookies().delete("token");
    // redirect("/");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`flex gap-2 items-center cursor-pointer py-2 text-white font-medium`}
        >
          <BiLogOutCircle
            color={`${type === "dashboard" ? "white" : "black"}`}
          />
          <span
            className={`${
              type === "dashboard" ? "text-white" : "text-black font-semibold"
            }`}
          >
            Logout
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Log out?</DialogTitle>
          <DialogDescription className="py-8">
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-5 w-full">
          <Button
            className="w-full"
            variant={"secondary"}
            type="button"
            onClick={handleLogout}
          >
            Logout
          </Button>
          <DialogTrigger asChild>
            <Button className="w-full" variant={"destructive"}>
              Cancel
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
