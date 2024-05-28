import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAddProduct } from "../hooks/useAddProduct";
import { ProductType } from "../types/types";

const ProductListForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addProduct, isPending } = useAddProduct();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<ProductType>();
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
      className="max-w-[500px] w-full flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg mx-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex justify-between items-center mb-4">
        <label className="text-slate-900 font-semibold text-lg w-1/4">
          Sku
        </label>
        <input
          className="w-3/4 p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none"
          type="text"
          placeholder="Sku"
          {...register("sku", {
            required: "This Field Is Required",
          })}
        />
      </div>
      <div className="w-full flex justify-between items-center mb-4">
        <label className="text-slate-900 font-semibold text-lg w-1/4">
          Name
        </label>
        <input
          className="w-3/4 p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none"
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "This Field Is Required",
          })}
        />
      </div>
      <div className="w-full flex justify-between items-center mb-4">
        <label className="text-slate-900 font-semibold text-lg w-1/4">
          Price
        </label>
        <input
          className="w-3/4 p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none"
          type="number"
          placeholder="Price"
          {...register("price", {
            required: "This Field Is Required",
          })}
        />
      </div>

      <div className="w-full flex justify-between items-center mt-6 mb-4">
        <label className="text-slate-900 font-semibold text-lg w-1/4">
          Type
        </label>
        <select
          className="w-3/4 p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none"
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
      </div>

      {getType === "none" && ""}
      {getType === "dvd" && (
        <div className="w-full flex justify-between items-center mb-4">
          <label className="text-slate-900 font-semibold text-lg w-1/4">
            Size (MB)
          </label>
          <input
            className="w-3/4 p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none"
            type="number"
            placeholder="#size"
            {...register("size", {
              required: "This Field Is Required",
            })}
          />
        </div>
      )}
      {getType === "furniture" && (
        <>
          <div className="w-full flex justify-between items-center mb-4">
            <label className="text-slate-900 font-semibold text-lg w-1/4">
              Height (CM)
            </label>
            <input
              className="w-3/4 p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none"
              type="number"
              placeholder="#height"
              {...register("height", {
                required: "This Field Is Required",
              })}
            />
          </div>
          <div className="w-full flex justify-between items-center mb-4">
            <label className="text-slate-900 font-semibold text-lg w-1/4">
              Width (CM)
            </label>
            <input
              className="w-3/4 p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none"
              type="number"
              placeholder="#width"
              {...register("width", {
                required: "This Field Is Required",
              })}
            />
          </div>
          <div className="w-full flex justify-between items-center mb-4">
            <label className="text-slate-900 font-semibold text-lg w-1/4">
              Length (CM)
            </label>
            <input
              className="w-3/4 p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none"
              type="number"
              placeholder="#length"
              {...register("length", {
                required: "This Field Is Required",
              })}
            />
          </div>
        </>
      )}
      {getType === "book" && (
        <div className="w-full flex justify-between items-center mb-4">
          <label className="text-slate-900 font-semibold text-lg w-1/4">
            Weight (KG)
          </label>
          <input
            className="w-3/4 p-2 rounded-lg border-2 border-slate-300 focus:border-slate-900 focus:outline-none"
            type="number"
            placeholder="#weight"
            {...register("weight", {
              required: "This Field Is Required",
            })}
          />
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
