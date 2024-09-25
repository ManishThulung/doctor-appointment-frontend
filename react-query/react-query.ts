import {
  QueryFunctionContext,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { request } from "./config";
// import { GetInfinitePagesInterface } from "../interfaces";

type QueryKeyT = [string, object | undefined];

export const fetcher = async <T>({
  queryKey,
}: Pick<QueryFunctionContext<QueryKeyT>, "queryKey">): Promise<T> => {
  const [url, params] = queryKey;
  const response = await request.get<T>(url, { params: { ...params } });
  return response.data;
};

export const useFetch = <T>(url: string | null, params?: object) => {
  const context = useQuery<T, Error, T, QueryKeyT>({
    queryKey: [url!, params],
    queryFn: ({ queryKey }) => fetcher({ queryKey }),
  });

  return context;
};

export const useFetchConditional = <T>(
  url: string | null,
  params?: object,
  options?: boolean
) => {
  const context = useQuery<T, Error, T, QueryKeyT>({
    queryKey: [url!, params],
    queryFn: ({ queryKey }) => fetcher({ queryKey }),
    enabled: options,
  });

  return context;
};

// export const useLoadMore = <T>(url: string | null, params?: object) => {
//   const context = useInfiniteQuery<
//     GetInfinitePagesInterface<T>,
//     Error,
//     GetInfinitePagesInterface<T>,
//     QueryKeyT
//   >(
//     [url!, params],
//     ({ queryKey, pageParam = 1 }) => fetcher({ queryKey, pageParam }),
//     {
//       getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
//       getNextPageParam: (lastPage) => {
//         return lastPage.nextId ?? false;
//       },
//     }
//   );

//   return context;
// };

// export const usePrefetch = <T>(url: string | null, params?: object) => {
//   const queryClient = useQueryClient();

//   return () => {
//     if (!url) {
//       return;
//     }

//     queryClient.prefetchQuery<T, Error, T, QueryKeyT>(
//       [url!, params],
//       ({ queryKey }) => fetcher({ queryKey })
//     );
//   };
// };

const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  url: string,
  invalidate?: string,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<S>, AxiosError, T | S>({
    mutationFn: func,
    onMutate: async (data: S) => {
      await queryClient.cancelQueries({
        queryKey: [url, params],
        exact: true,
      });

      const previousData = queryClient.getQueryData<T>([url, params]);

      queryClient.setQueryData<T>([url, params], (oldData) => {
        return updater ? updater(oldData!, data) : (data as unknown as T);
      });

      return { previousData };
    },
    onError: (err: AxiosError, _: T | S, context: any) => {
      if (err && context && context.previousData !== undefined) {
        queryClient.setQueryData([url, params], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [url, params] });
      invalidate && queryClient.invalidateQueries({ queryKey: [invalidate] });
    },
  } as UseMutationOptions<AxiosResponse<S>, AxiosError, T | S>);
};

export const usePost = <T, S>(
  url: string,
  invalidate?: string,
  params?: object,
  config?: any,
  updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>(
    (data) => request.post<S>(url, data, config),
    url,
    invalidate,
    params,
    updater
  );
};

export const useDelete = <T>(
  url: string,
  invalidate?: string,
  params?: object,
  updater?: (oldData: T, id: string | number) => T
) => {
  return useGenericMutation<T, string | number>(
    (id) => request.delete(`${url}/${id}`),
    url,
    invalidate,
    params,
    updater
  );
};

export const useUpdate = <T, S>(
  url: string,
  invalidate?: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>(
    (data) => request.patch<S>(url, data),
    url,
    invalidate,
    params,
    updater
  );
};
