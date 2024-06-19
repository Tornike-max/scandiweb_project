import { Link } from "react-router-dom";
import { useCheckInputs } from "../context/useCheckInputs";
import { useGetProducts } from "../hooks/useGetProducts";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import Product from "./Product";

const ProductList = () => {
  const { products, isProductsPending } = useGetProducts();
  const { checkedProductIds, handleCheckboxChange } = useCheckInputs();
  const { deleteProduct, isDeleting } = useDeleteProduct();

  const handleDelete = () => {
    deleteProduct(checkedProductIds);
  };

  if (isProductsPending) return <p>Loading...</p>;

  return (
    <div className="w-full flex justify-center items-center flex-col py-4 lg:pt-32 lg:pb-10">
      <div className="w-full max-w-screen-xl bg-cover px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="flex justify-center items-center p-2"
              >
                <Product
                  product={product}
                  isChecked={checkedProductIds.includes(product.id)}
                  onCheckboxChange={handleCheckboxChange}
                />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products available.
            </p>
          )}
        </div>
      </div>
      {!Array.isArray(products) && (
        <div className="w-full flex justify-center">
          <p className="text-red-500 text-lg font-semibold">
            No Data Provided!
          </p>
        </div>
      )}

      {checkedProductIds.length > 0 && (
        <div className="w-full flex justify-center items-center py-4">
          <button
            onClick={handleDelete}
            className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-150"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "MASS DELETE"}
          </button>
        </div>
      )}

      <div className="w-full flex justify-center items-center py-4">
        <Link
          to="/productadd"
          className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150"
        >
          ADD
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
