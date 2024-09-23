import { useFetch, usePost } from "@/react-query/react-query";
import { Role } from "@/types/enums.types";

export const useCreateAppointment = () => {
  const response = usePost(
    `appointment`,
    undefined
    // updater
  );
  return {
    ...response,
  };
};

export const useGetAppointments = (role: string) => {
  let response: any;
  if (role === Role.Doctor) {
    response = useFetch(`appointment`, undefined);
    return {
      ...response,
    };
  }
  if (role === Role.Admin) {
    response = useFetch(`appointment/doctor`, undefined);
    return {
      ...response,
    };
  }
};
