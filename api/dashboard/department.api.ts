import { useFetch, usePost, usePostFormData } from "@/react-query/react-query";
import { Department } from "@/types/utils.types";

export const useCreateDepartment = () => {
  const response = usePostFormData(
    `department`,
    undefined,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    // updater
  );
  return {
    ...response,
  };
};

export const useGetDepartment = () => {
  const response = useFetch<Department[]>(`department`);
  return {
    ...response,
  };
};
