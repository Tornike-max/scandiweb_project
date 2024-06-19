import { Link, useLocation } from "react-router-dom";
import { useCheckInputs } from "../context/useCheckInputs";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

const Header = () => {
  const { pathname } = useLocation();
  const { checkedProductIds } = useCheckInputs();
  const { deleteProduct, isDeleting } = useDeleteProduct();

  const handleDelete = () => {
    if (checkedProductIds.length > 0) {
      deleteProduct(checkedProductIds);
    }
  };

  return (
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
              to="/productadd"
              className="py-1 px-3 border-[2px] border-b-4 border-r-4 border-slate-900 hover:border-r-[5px] hover:border-b-[5px] duration-100 transition-all"
            >
              ADD
            </Link>
            <button
              onClick={handleDelete}
              className="delete-checkbox py-1 px-3 border-[2px] border-b-4 border-r-4 border-slate-900 hover:border-r-[5px] hover:border-b-[5px] duration-100 transition-all"
            >
              {isDeleting ? "Deleting..." : "MASS DELETE"}
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="py-1 px-3 border-[2px] border-b-4 border-r-4 border-slate-900 hover:border-r-[5px] hover:border-b-[5px] duration-100 transition-all"
            >
              Save
            </Link>
            <Link
              to="/"
              className="py-1 px-3 border-[2px] border-b-4 border-r-4 border-slate-900 hover:border-r-[5px] hover:border-b-[5px] duration-100 transition-all"
            >
              Cancel
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
