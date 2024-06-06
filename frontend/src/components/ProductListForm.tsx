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

  return (
    <form
      className="max-w-[600px] w-full flex flex-col gap-4 p-4 bg-white rounded-xl shadow-2xl mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4">
        <label className="text-slate-900 font-semibold text-lg sm:w-1/4 w-full">
          Sku
        </label>
        <div className="sm:w-3/4 w-full flex flex-col">
          <input
            className="w-full p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition duration-150 ease-in-out"
            type="text"
            placeholder="Sku"
            {...register("sku", {
              required: "This Field Is Required",
            })}
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
            placeholder="Name"
            {...register("name", {
              required: "This Field Is Required",
            })}
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
          Price
        </label>
        <div className="sm:w-3/4 w-full flex flex-col">
          <input
            className="w-full p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition duration-150 ease-in-out"
            type="number"
            placeholder="Price"
            {...register("price", {
              required: "This Field Is Required",
            })}
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
            className="w-full p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition duration-150 ease-in-out"
            {...register("type", {
              required: "This Field Is Required",
            })}
            onChange={(e) => changeType(e.target.value)}
          >
            <option value="none">Type Switcher</option>
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
              type="number"
              placeholder="#size"
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

      {getType === "furniture" && (
        <>
          <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4">
            <label className="text-slate-900 font-semibold text-lg sm:w-1/4 w-full">
              Height (CM)
            </label>
            <div className="sm:w-3/4 w-full flex flex-col">
              <input
                className="w-full p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition duration-150 ease-in-out"
                type="number"
                placeholder="#height"
                {...register("height", {
                  required: "This Field Is Required",
                })}
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
                type="number"
                placeholder="#width"
                {...register("width", {
                  required: "This Field Is Required",
                })}
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
                type="number"
                placeholder="#length"
                {...register("length", {
                  required: "This Field Is Required",
                })}
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

      {getType === "book" && (
        <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4">
          <label className="text-slate-900 font-semibold text-lg sm:w-1/4 w-full">
            Weight (KG)
          </label>
          <div className="sm:w-3/4 w-full flex flex-col">
            <input
              className="w-full p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none transition duration-150 ease-in-out"
              type="number"
              placeholder="#weight"
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

      <div className="w-full flex justify-end items-center">
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150"
        >
          {isPending ? "Loading..." : "Add"}
        </button>
      </div>
    </form>
  );
};

export default ProductListForm;
