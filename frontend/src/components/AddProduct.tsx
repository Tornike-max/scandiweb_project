import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAddProduct } from "../hooks/useAddProduct";
import { ProductType } from "../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../zod/zod";

const AddProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addProduct, isPending } = useAddProduct();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(schema),
  });

  const getType = searchParams.get("type") || "none";

  const onSubmit: SubmitHandler<ProductType> = (data) => {
    if (!data) {
      return;
    }
    addProduct(data, {
      onSuccess: () => {
        reset();
        navigate("/");
      },
    });
  };

  const changeType = (value: string) => {
    if (!value) return;
    searchParams.set("type", value);
    setSearchParams(searchParams);
  };

  const productTypeDescriptions: Record<ProductType["type"], string> = {
    dvd: "Please provide size (MB)",
    book: "Please provide weight (KG)",
    furniture: "Please provide dimensions (Height, Width, Length in CM)",
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="product_form"
      className="w-full flex justify-center items-center flex-col py-4 pb-10"
    >
      <header className="w-full h-[80px] flex items-center justify-center flex-col gap-2 fixed top-0 px-2 sm:px-4 md:px-6 lg:px-8 z-10 bg-slate-50 ">
        <div className="w-full flex justify-between items-center px-4">
          <h1 className="font-semibold text-lg sm:text-2xl lg:text-3xl">
            Product Add
          </h1>
          <div className="flex items-center justify-center gap-1 sm:gap-4">
            <button
              type="submit"
              disabled={isPending}
              className="py-1 px-3 border-[2px] border-b-4 border-r-4 border-slate-900 hover:border-r-[5px] hover:border-b-[5px] duration-100 transition-all"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="py-1 px-3 border-[2px] border-b-4 border-r-4 border-slate-900 hover:border-r-[5px] hover:border-b-[5px] duration-100 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center items-center h-[2px] bg-black rounded-3xl "></div>
      </header>
      <div className="w-full max-w-screen-md bg-cover px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4">
          <label
            htmlFor="sku"
            className="text-slate-900 font-semibold text-lg sm:w-1/4 w-full"
          >
            SKU
          </label>
          <div className="sm:w-3/4 w-full flex flex-col">
            <input
              id="sku"
              className="w-full p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition duration-150 ease-in-out"
              type="text"
              placeholder="SKU"
              {...register("sku")}
            />
            {errors.sku && (
              <span className="text-red-500 text-sm mt-1">
                {errors.sku.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4">
          <label
            htmlFor="name"
            className="text-slate-900 font-semibold text-lg sm:w-1/4 w-full"
          >
            Name
          </label>
          <div className="sm:w-3/4 w-full flex flex-col">
            <input
              className="w-full p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition duration-150 ease-in-out"
              type="text"
              id="name"
              placeholder="Name"
              {...register("name")}
            />
            {errors.name && (
              <span id="skuFeedback" className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4">
          <label className="text-slate-900 font-semibold text-lg sm:w-1/4 w-full">
            Price ($)
          </label>
          <div className="sm:w-3/4 w-full flex flex-col">
            <input
              className="w-full p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition duration-150 ease-in-out"
              type="number"
              id="price"
              placeholder="Price"
              min="0.01"
              step="0.01"
              {...register("price")}
            />
            {errors.price && (
              <span className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4">
          <label className="text-slate-900 font-semibold text-lg sm:w-1/4 w-full">
            Type
          </label>
          <div className="sm:w-3/4 w-full flex flex-col">
            <select
              id="productType"
              className="w-full p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition duration-150 ease-in-out"
              {...register("type")}
              onChange={(e) => changeType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="dvd">DVD</option>
              <option value="book">Book</option>
              <option value="furniture">Furniture</option>
            </select>
            {errors.type && (
              <span className="text-red-500 text-sm mt-1">
                {errors.type.message}
              </span>
            )}
          </div>
        </div>

        {getType === "dvd" && (
          <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4">
            <label className="text-slate-900 font-semibold text-lg sm:w-1/4 w-full">
              Size (MB)
            </label>
            <div className="sm:w-3/4 w-full flex flex-col">
              <input
                className="w-full p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition duration-150 ease-in-out"
                type="text"
                id="size"
                min="1"
                step="1"
                placeholder={productTypeDescriptions.dvd}
                {...register("size")}
              />
              {errors.size && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.size.message}
                </span>
              )}
            </div>
          </div>
        )}

        {getType === "book" && (
          <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4">
            <label className="text-slate-900 font-semibold text-lg sm:w-1/4 w-full">
              Weight (KG)
            </label>
            <div className="sm:w-3/4 w-full flex flex-col">
              <input
                id="weight"
                min="1"
                step="1"
                className="w-full p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition duration-150 ease-in-out"
                type="text"
                placeholder={productTypeDescriptions.book}
                {...register("weight")}
              />
              {errors.weight && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.weight.message}
                </span>
              )}
            </div>
          </div>
        )}

        {getType === "furniture" && (
          <>
            <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4">
              <label className="text-slate-900 font-semibold text-lg sm:w-1/4 w-full">
                Height (CM)
              </label>
              <div className="sm:w-3/4 w-full flex flex-col  gap-4">
                <input
                  className="w-full p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition duration-150 ease-in-out"
                  type="text"
                  id="height"
                  min="1"
                  step="1"
                  {...register("height")}
                  placeholder="height"
                />
                {errors.height && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.height.message}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4">
              <label className="text-slate-900 font-semibold text-lg sm:w-1/4 w-full">
                Width (CM)
              </label>
              <div className="sm:w-3/4 w-full flex flex-col">
                <input
                  className="w-full p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition duration-150 ease-in-out"
                  type="text"
                  id="width"
                  min="1"
                  step="1"
                  {...register("width")}
                  placeholder="width"
                />
                {errors.width && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.width.message}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4">
              <label className="text-slate-900 font-semibold text-lg sm:w-1/4 w-full">
                Length (CM)
              </label>
              <div className="sm:w-3/4 w-full flex flex-col">
                <input
                  className="w-full p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition duration-150 ease-in-out"
                  type="text"
                  id="length"
                  min="1"
                  step="1"
                  placeholder="length"
                  {...register("length")}
                />
                {errors.length && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.length.message}
                  </span>
                )}
              </div>
            </div>
          </>
        )}

        <div>{productTypeDescriptions.getType}</div>
      </div>
    </form>
  );
};

export default AddProduct;
