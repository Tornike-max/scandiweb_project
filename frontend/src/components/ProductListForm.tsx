import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAddProduct } from "../hooks/useAddProduct";
import { ProductType } from "../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../zod/zod";

const ProductListForm = () => {
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
      id="#product_form"
      className="max-w-[600px] w-full flex flex-col gap-4 p-4 bg-white rounded-xl shadow-2xl mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4">
        <label className="text-slate-900 font-semibold text-lg sm:w-1/4 w-full">
          SKU
        </label>
        <div className="sm:w-3/4 w-full flex flex-col">
          <input
            id="#sku"
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
        <label className="text-slate-900 font-semibold text-lg sm:w-1/4 w-full">
          Name
        </label>
        <div className="sm:w-3/4 w-full flex flex-col">
          <input
            className="w-full p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition duration-150 ease-in-out"
            type="text"
            id="#name"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">
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
            id="#price"
            placeholder="Price"
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
            id="#productType"
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
              id="#size"
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
              id="#weight"
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
                id="#height"
                {...register("height")}
                placeholder="#height"
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
                id="#width"
                {...register("width")}
                placeholder="#width"
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
                id="#length"
                placeholder="#length"
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

      <div className="w-full flex justify-center">
        <button
          type="submit"
          className="py-2 px-6 bg-slate-900 text-white rounded-lg shadow-md hover:bg-slate-800 transition duration-150 ease-in-out"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default ProductListForm;
