import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response;
  } catch (error) {
    throw error;
  }
};

const useGetCountries = () => {
  const {
    data: response,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const countries = response?.data || [];
  return { countries, isLoading, isPending };
};

export default useGetCountries;
