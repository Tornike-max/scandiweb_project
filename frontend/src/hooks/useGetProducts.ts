import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from "../api/api";

export const useGetProducts = () => {
  const { data: products, isPending: isProductsPending } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductsApi(),
  });

  return { products, isProductsPending };
};
