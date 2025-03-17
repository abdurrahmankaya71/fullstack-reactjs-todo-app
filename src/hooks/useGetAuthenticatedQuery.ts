
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.config";
import { AxiosRequestConfig } from "axios";

interface IGetAuthenticatedQuery {
    queryKey: string[];
    url: string;
    config?: AxiosRequestConfig;
}

const useGetAuthenticatedQuery = ({queryKey, url, config}: IGetAuthenticatedQuery) => {
  return (
    useQuery({
        queryKey: queryKey,
        queryFn: async () => {
          const { data } = await axiosInstance.get(url, config);
          return data;
        },
      })
  )
}

export default useGetAuthenticatedQuery;
