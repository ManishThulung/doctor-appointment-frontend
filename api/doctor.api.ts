import { useFetch } from "@/react-query/react-query";

export const useGetDoctors = () => {
  const response: any = useFetch(`doctor`);
  return {
    ...response,
  };
};

export const useGetDoctorById = (id: string) => {
  const response: any = useFetch(`doctor/${id}`);
  return {
    ...response,
  };
};
