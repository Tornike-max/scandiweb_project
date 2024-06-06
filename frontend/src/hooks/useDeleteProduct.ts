import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductApi } from "../api/api";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: (productIds: string[]) => deleteProductApi(productIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      throw new Error("Error while deleting product");
    },
  });
  return { deleteProduct, isDeleting };
};
