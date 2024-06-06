import { Link, useLocation } from "react-router-dom";
import { useCheckInputs } from "../context/useCheckInputs";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

const Header = () => {
  const { pathname } = useLocation();
  const { checkedProductIds: productIds } = useCheckInputs();
  const { deleteProduct, isDeleting } = useDeleteProduct();

  const handleDelete = () => {
    productIds.length === 0 ? null : deleteProduct(productIds);
  };
  return (
    <>
      <div className="w-full flex justify-between items-center px-4">
        <h1 className="font-semibold text-lg sm:text-2xl lg:text-3xl">
          {pathname === "/"
            ? "Product List"
            : pathname === "/productadd"
            ? "Product Add"
            : ""}
        </h1>
        <div className="flex items-center justify-center gap-1 sm:gap-4">
          {pathname === "/" ? (
            <>
              <Link
                to={"/productadd"}
                className="  py-1 px-3 border-[2px] border-b-4 border-r-4 border-slate-900 hover:border-r-[5px] hover:border-b-[5px] duration-100 transition-all"
              >
                ADD
              </Link>
              <button
                onClick={() => handleDelete()}
                id="delete-product-btn"
                className="delete-checkbox"
              >
                {isDeleting ? "Deleting..." : "MASS DELETE"}
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/"}
                className="py-1 px-3 border-[2px] border-b-4 border-r-4 border-slate-900 hover:border-r-[5px] hover:border-b-[5px] duration-100 transition-all"
              >
                Save
              </Link>
              <Link
                to="/"
                id="delete-product-btn"
                className="py-1 px-3 border-[2px] border-b-4 border-r-4 border-slate-900 hover:border-r-[5px] hover:border-b-[5px] duration-100 transition-all"
              >
                Cancel
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
