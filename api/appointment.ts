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
  if (role === Role.Admin) {
    response = useFetch(`appointment`, undefined);
    return {
      ...response,
    };
  }
  if (role === Role.Doctor) {
    response = useFetch(`appointment/doctor`, undefined);
    return {
      ...response,
    };
  }
};

export const useGetMyAppointments = () => {
  const response: any = useFetch(`appointment/me`, undefined);
  return {
    ...response,
  };
};

export const useCancelAppointment = () => {
  const response = usePost(`appointment/me/cancel`, undefined);
  return {
    ...response,
  };
};
