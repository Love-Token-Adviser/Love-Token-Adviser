import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";

interface Request {
  name: string;
  price: string;
  URL: string;
  image: string;
}

const usePostFavorites = () => {
  const postFavorites = async ({ name, price, URL, image }: Request) => {
    return await apiClient.post(`/LoveTokenAdviser/add_to_favorites/`, {
      gift_name: name,
      gift_price: price,
      gift_image_url: URL,
      gift_url: image,
    });
  };

  return useMutation({
    mutationFn: postFavorites,
  });
};

export default usePostFavorites;
