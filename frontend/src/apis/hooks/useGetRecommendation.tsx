import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

interface Request {
  type: "gift" | "outfit";
  gender: string;
  minPrice: string;
  maxPrice: string;
  keyword: string;
}

const useGetRecommendation = ({
  type,
  gender = "0",
  minPrice,
  maxPrice,
  keyword,
}: Request) => {
  const path = type === "gift" ? "recommend_gift" : "recommend_outfit";

  const getData = async () => {
    const response = await apiClient.get(`/LoveTokenAdviser/${path}/`, {
      params: {
        gender,
        min_price: minPrice || undefined,
        max_price: maxPrice || undefined,
        user_keyword: keyword || undefined,
      },
    });

    return response.data;
  };

  return useQuery({
    queryKey: ["recommendation"],
    queryFn: getData,
  });
};

export default useGetRecommendation;
