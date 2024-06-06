import { useGetProducts } from "../hooks/useGetProducts";
import { ProductType } from "../types/types";
import Product from "./Product";
import { useCheckInputs } from "../context/useCheckInputs";

const ProductList = () => {
  const { products, isProductsPending } = useGetProducts();
  const { checkedProductIds, handleCheckboxChange } = useCheckInputs();

  if (isProductsPending) return <p>Loading...</p>;

  return (
    <div className="w-full flex justify-center items-center flex-col py-4 lg:pt-32 lg:pb-10">
      <div className="w-full max-w-screen-xl bg-cover px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product: ProductType) => (
              <div
                key={product.id}
                className="flex justify-center items-center p-2"
              >
                <Product
                  product={product}
                  isChecked={checkedProductIds.includes(product?.id)}
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
    </div>
  );
};

export default ProductList;
