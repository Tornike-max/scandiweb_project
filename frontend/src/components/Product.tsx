import { ProductType } from "../types/types";

const Product = ({
  product,
  isChecked,
  onCheckboxChange,
}: {
  product: ProductType;
  isChecked: boolean;
  onCheckboxChange: (productId: string, isChecked: boolean) => void;
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(product.id, e.target.checked);
  };

  return (
    <div className="max-w-[350px] w-full py-2 px-3 rounded-sm border-[3px] border-slate-900">
      <form className="w-full flex justify-start items-center">
        <input
          value={product.id}
          form="delete-form"
          type="checkbox"
          className="delete-checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </form>
      <div className="w-full flex justify-center items-center flex-col px-4 font-medium">
        <p>{product.name}</p>
        <p>{product.sku}</p>
        <p>{product.price}</p>
        <p>
          {product.size !== null
            ? `Size: ${product.size} MB`
            : product.weight !== null
            ? `Weight: ${product.weight} KG`
            : product.height !== null
            ? `Dimensions: ${product.height}x${product.width}x${product.length} CM`
            : ""}
        </p>
      </div>
    </div>
  );
};

export default Product;
