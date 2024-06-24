import { useNavigate } from "react-router-dom";
import { useCheckInputs } from "../context/useCheckInputs";
import { useGetProducts } from "../hooks/useGetProducts";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import Product from "./Product";

const ProductList = () => {
  const { products, isProductsPending } = useGetProducts();
  const { checkedProductIds, handleCheckboxChange } = useCheckInputs();
  const { deleteProduct, isDeleting } = useDeleteProduct();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (checkedProductIds.length > 0) {
      deleteProduct(checkedProductIds);
    }
  };

  if (isProductsPending) return <p>Loading...</p>;

  return (
    <div className="w-full flex justify-center items-center flex-col py-4 lg:pt-32 lg:pb-10">
      <header className="w-full h-[80px] flex items-center justify-center flex-col gap-2 fixed top-0 px-2 sm:px-4 md:px-6 lg:px-8 z-10 bg-slate-50 ">
        <div className="w-full flex justify-between items-center px-4">
          <h1 className="font-semibold text-lg sm:text-2xl lg:text-3xl">
            Product List
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/add-product")}
              className="py-1 px-3 border-[2px] border-b-4 border-r-4 border-slate-900 hover:border-r-[5px] hover:border-b-[5px] duration-100 transition-all"
            >
              ADD
            </button>
            <button
              onClick={handleDelete}
              id="delete-product-btn"
              className="delete-checkbox py-1 px-3 border-[2px] border-b-4 border-r-4 border-slate-900 hover:border-r-[5px] hover:border-b-[5px] duration-100 transition-all"
            >
              {isDeleting ? "Deleting..." : "MASS DELETE"}
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center items-center h-[2px] bg-black rounded-3xl "></div>
      </header>
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
    </div>
  );
};

export default ProductList;
