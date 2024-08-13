import { useFetch, usePost } from "@/react-query/react-query";

export const useGetHospitals = () => {
  const response: any = useFetch(`hospital`);
  return {
    ...response,
  };
};
