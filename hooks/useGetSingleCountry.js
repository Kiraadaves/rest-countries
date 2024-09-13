import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = "https://restcountries.com/v3.1/name/";

const fetchCountry = async (name) => {
  try {
    const response = await axios.get(`${url}${name}`);
    return response;
  } catch (error) {
    throw error;
  }
};

const useGetSingleCountry = (name) => {
  const {
    data: response,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["country"],
    queryFn: () => fetchCountry(name),
  });

  const country = response?.data || [];
  return { country, isLoading, isPending };
};

export default useGetSingleCountry;
