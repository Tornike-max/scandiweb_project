import { ProductType } from "../types/types";

const Product = ({ product }: { product: ProductType }) => {
  return (
    <div className="max-w-[250px] w-full py-2 px-3 rounded-sm border-[3px] border-slate-900">
      <div className="w-full flex justify-start items-center">
        <input type="checkbox" className="rounded-md cursor-pointer" />
      </div>
      <div className="w-full flex justify-center items-center flex-col px-6 font-medium">
        <p>{product.name}</p>
        <p>{product.sku}</p>
        <p>{product.price}</p>
        <p>
          {product.size !== null
            ? `Size: ${product.size} MB`
            : product?.weight !== null
            ? `Weight: ${product.weight}KG`
            : product?.height !== null
            ? `Dimension: ${product.height}x${product.width}x${product.length}`
            : ""}
        </p>
      </div>
    </div>
  );
};

export default Product;
