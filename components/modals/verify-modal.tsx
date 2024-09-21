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
import SubmitButton from "../submit-button";
import { useVerifyHospital } from "@/api/hospital.api";

interface IProps {
  id: string;
  name: string;
}

const VerifyModal: FC<IProps> = ({ id, name }) => {
  // const {isPending, mutateAsync} = useVerifyHospital()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`flex gap-2 items-center cursor-pointer py-2 text-white font-medium`}
        >
          <BiLogOutCircle color="black" />
          <span className="text-black font-semibold">Approve {name}?</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Verify {name}?</DialogTitle>
          <DialogDescription className="py-8">
            Are you sure you want to approve {name}?
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-5 w-full">
          <SubmitButton isPending={true}>Verify</SubmitButton>
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

export default VerifyModal;
