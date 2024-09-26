import { Dispatch, FC, SetStateAction } from "react";
import { toast } from "react-toastify";
import Loading from "../loaders/loading";
import { Button } from "../ui/button";

interface IProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setAppointmentId: Dispatch<SetStateAction<string | null>>;
  appointmentId: string | null;
  mutateAsync: (paylod: { id: string }) => Promise<any>;
  isLoading: boolean;
  type: "Approve" | "Update";
}
const GenericlModal: FC<IProps> = ({
  setIsOpen,
  setAppointmentId,
  appointmentId,
  mutateAsync,
  isLoading,
  type,
}) => {
  const closeModal = () => {
    setIsOpen(false);
    setAppointmentId(null);
  };

  const handleCick = async () => {
    try {
      if (appointmentId) {
        const res: any = await mutateAsync({ id: appointmentId });
        if (res.data?.success) {
          toast.success(res.data.message);
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setIsOpen(false);
      setAppointmentId(null);
    } finally {
      setIsOpen(false);
      setAppointmentId(null);
    }
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
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {type} Appointment
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to {type} your appointment?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-6">
              <Button type="button" onClick={handleCick} className="flex-1">
                Submit
                {isLoading && (
                  <div className="ml-2">
                    <Loading />
                  </div>
                )}
              </Button>
              <Button
                type="button"
                variant={"destructive"}
                onClick={closeModal}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericlModal;
