import { usePost } from "@/react-query/react-query";

// updater?: (oldData: any[], newData: any) => any[]
// export const useRegister = () => {
//   const response = usePost(
//     `user/register/`,
//     undefined,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//     // updater
//   );
//   return {
//     ...response,
//   };
// };
export const useLogin = () => {
  const response = usePost(
    `auth/user/login`,
    undefined
    // updater
  );
  console.log(response, "resssss");
  return {
    ...response,
  };
};
