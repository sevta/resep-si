import useSWR from "swr";
import { getUser } from "../services";

export default function useUser() {
  const { data, mutate, error } = useSWR("api_user", getUser);

  return {
    user: data?.data,
    mutate,
  };
}
