import { FaFilePdf } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/custom-dialog";
import { PdfRender } from "../pdf/pdf-render";

interface IProps {
  src: string;
  text?: string;
}

export function PdfRenderModal({ src, text }: IProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-white flex gap-1 items-center justify-start bg-primary py-3 rounded-full font-bold text-black max-sm:w-full">
          {text ? text : "View full documents"}: <FaFilePdf />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[95%] m-auto md:w-fit">
        <DialogHeader>
          <DialogTitle>Documents</DialogTitle>
        </DialogHeader>
        {src && <PdfRender src={src} />}

        <DialogFooter>
          <div className="w-full flex gap-4 items-center justify-center max-sm:flex-col">
            <DialogTrigger asChild>
              <button
                type="submit"
                className="flex items-center justify-center bg-primary py-2 px-8 rounded-full font-bold text-white max-sm:w-full"
              >
                <span className="font-bold">Done</span>
              </button>
            </DialogTrigger>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
