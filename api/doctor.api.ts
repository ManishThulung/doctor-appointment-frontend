import { useFetch, usePost } from "@/react-query/react-query";

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

export const useCreateDoctor = () => {
  const response = usePost(
    `doctor`,
    undefined,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    // updater
  );
  console.log(response, "resssss");
  return {
    ...response,
  };
};
