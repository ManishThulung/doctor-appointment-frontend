import { useFetch, usePost } from "@/react-query/react-query";

export const useCreateReview = (doctorId: string) => {
  const response = usePost(
    `review`,
    `review/doctor/${doctorId}`, // invalidate
    undefined
    // updater
  );
  return {
    ...response,
  };
};


export const useGetReviewsByDoctorId = (id: string) => {
  const response: any = useFetch(`review/doctor/${id}`);
  return {
    ...response,
  };
};