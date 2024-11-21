import {
  useFetch,
  useFetchConditional,
  usePost,
  usePostFormData,
  useUpdate,
} from "@/react-query/react-query";

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
export const useGetDoctorByHospitalId = (id: string) => {
  const response: any = useFetch(`doctor/hospital/${id}`);
  return {
    ...response,
  };
};

export const useCreateDoctor = () => {
  const response = usePostFormData(
    `doctor`,
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

// hospital admin
export const useGetDoctorsCount = (option: boolean) => {
  const response: any = useFetchConditional(
    `doctor/count/doctor`,
    undefined,
    option
  );
  return {
    ...response,
  };
};

// hospital admin
export const useGetDoctorByHospitalIdAdmin = () => {
  const response: any = useFetch(`doctor/hospital/admin`);
  return {
    data: response?.data || [],
    isPending: response?.isPending ?? true,
    ...response,
  };
};
export const useApproveDoctor = () => {
  const response = useUpdate(
    `doctor/approve`,
    "doctor/hospital/admin",
    undefined
  );
  return {
    ...response,
  };
};

export const useDoctorLogin = () => {
  const response = usePost(`doctor/login`, undefined);
  return {
    ...response,
  };
};

// public
export const useGetDoctorsCountOfHospital = (id: string) => {
  const response: any = useFetch(`doctor/count/doctor/${id}`, undefined);
  return {
    ...response,
  };
};

// recommedations
export const useGetDoctorRecommedations = () => {
  const response: any = useFetch(`recommendations`);
  return {
    ...response,
  };
};
