import { useFetch, usePost, useUpdate } from "@/react-query/react-query";

export const useGetHospitals = () => {
  const response: any = useFetch(`hospital`);
  return {
    ...response,
  };
};

// super-admin
export const useGetHospitalsAdmin = () => {
  const response: any = useFetch(`hospital/admin`);
  return {
    ...response,
  };
};

export const useRegisterHospital = () => {
  const response = usePost(
    `hospital`,
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

// superAdmin
export const useVerifyHospital = (id: string, email: string) => {
  const response = useUpdate(
    `hospital/verify?id=${id}&email=${email}`,
    undefined
    // updater
  );
  return {
    ...response,
  };
};
