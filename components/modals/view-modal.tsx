import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "../ui/button";
import { PdfRender } from "../pdf/pdf-render";
import Image from "next/image";

interface IProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: any;
  type: "Doctor" | "Hospital";
}
const ViewDetailModal: FC<IProps> = ({ setIsOpen, data, type }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="relative z-100"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[60rem]">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {type} Details
                  </h3>
                  <div className="mt-2 flex flex-col gap-4">
                    <p>Id: {data?.id}</p>
                    <p>Name: {data?.name}</p>
                    <p>Email: {data?.email}</p>
                    <p>Phone No.: {data?.phone}</p>
                    {type === "Doctor" && (
                      <div className="flex flex-col gap-4">
                        <p>Address: {data?.address}</p>
                        <p>Gender: {data?.Gender}</p>
                        <div>
                          <p>Photo: </p>
                          <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.avatar?.filename}`}
                            alt="doctor"
                            width={100}
                            height={100}
                            style={{
                              width: "auto",
                              height: "auto",
                            }}
                            className="object-cover w-full h-[400px]"
                          />
                        </div>
                      </div>
                    )}
                    {type === "Hospital" && (
                      <div className="flex flex-col gap-4">
                        <p>PAN: {data?.pan}</p>
                        <p>
                          Address:{" "}
                          {
                            ((data?.address?.wardNo, data?.address?.wardName), data?.address?.municipality,
                            data?.address?.district,
                            data?.address?.country)
                          }
                        </p>
                      </div>
                    )}

                    <p>
                      Certificate:{" "}
                      <PdfRender src={data?.certificate?.filename} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-6">
              <Button type="button" onClick={closeModal} className="flex-1">
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailModal;
