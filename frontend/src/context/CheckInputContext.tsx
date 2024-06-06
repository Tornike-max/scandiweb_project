import { createContext, useState } from "react";

type CheckedInputsType = {
  handleCheckboxChange: (productId: string, isChecked: boolean) => void;
  checkedProductIds: string[];
};

const defaultValues: CheckedInputsType = {
  handleCheckboxChange: () => {},
  checkedProductIds: [],
};

export const CheckInputsContext =
  createContext<CheckedInputsType>(defaultValues);

export const CheckInputsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [checkedProductIds, setCheckedProductIds] = useState<string[]>([]);

  const handleCheckboxChange = (productId: string, isChecked: boolean) => {
    setCheckedProductIds((prev) =>
      isChecked ? [...prev, productId] : prev.filter((id) => id !== productId)
    );
  };

  const values = {
    handleCheckboxChange,
    checkedProductIds,
  };

  return (
    <CheckInputsContext.Provider value={values}>
      {children}
    </CheckInputsContext.Provider>
  );
};
