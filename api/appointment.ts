import { usePost } from "@/react-query/react-query";

export const useCreateAppointment = () => {
  const response = usePost(
    `doctor/appointment`,
    undefined
    // updater
  );
  return {
    ...response,
  };
};
