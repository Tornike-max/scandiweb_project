import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductApi } from "../api/api";
import { ProductType } from "../types/types";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  const { mutate: addProduct, isPending } = useMutation({
    mutationFn: (data: ProductType) => addProductApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      throw new Error("Error while adding product");
    },
  });

  return { addProduct, isPending };
};
