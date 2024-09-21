import { useFetch, usePost } from "@/react-query/react-query";

export const useCreateReview = () => {
  const response = usePost(
    `review`,
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