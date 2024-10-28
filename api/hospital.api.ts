import {
  useFetch,
  useFetchConditional,
  usePost,
  usePostFormData,
  useUpdate,
} from "@/react-query/react-query";

export const useGetHospitals = () => {
  const response: any = useFetch(`hospital`);
  return {
    ...response,
  };
};

export const useGetHospitalById = (id: string) => {
  const response: any = useFetch(`hospital/${id}`);
  return {
    ...response,
  };
};

// super-admin
export const useGetHospitalsAdmin = () => {
  const response: any = useFetch(`hospital/admin`);
  return {
    data: response?.data || null, // Default data to `null` if undefined
    isPending: response?.isPending ?? true, // Default loading state to true
    ...response,
  };
};
export const useGetHospitalsCount = (option: boolean) => {
  const response: any = useFetchConditional(
    `hospital/count/hospital`,
    undefined,
    option
  );
  return {
    ...response,
  };
};

export const useRegisterHospital = () => {
  const response = usePostFormData(
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

export const useHospitalLogin = () => {
  const response = usePost(
    `hospital/login/admin`,
    undefined
    // updater
  );
  return {
    ...response,
  };
};

// super-admin
export const useApproveHospital = () => {
  const response = useUpdate(`hospital/approve`, "hospital/admin", undefined);
  return {
    ...response,
  };
};
