import React, { createContext } from "react";
import {
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { ProductType } from "../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../zod/zod";
import { useAddProduct } from "../hooks/useAddProduct";

type CheckInputTypes = {
  onSubmit: SubmitHandler<ProductType>;
  handleSubmit: UseFormHandleSubmit<ProductType>;
  reset: UseFormReset<ProductType>;
  register: UseFormRegister<ProductType>;
  errors: FormState<ProductType>["errors"];
  isPending: boolean;
};

const defaultValues: CheckInputTypes = {
  onSubmit: () => {},
  handleSubmit: () => {},
  reset: () => {},
  register: () => ({}),
  errors: {},
  isPending: false,
};

export const SaveProductContext = createContext<CheckInputTypes>(defaultValues);

export const SaveProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { addProduct, isPending } = useAddProduct();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(schema),
  });

  const values = {
    onSubmit: handleSubmit((data) => {
      console.log(data);
      addProduct(data);
      reset();
    }),
    handleSubmit,
    reset,
    register,
    errors,
    isPending,
  };

  return (
    <SaveProductContext.Provider value={values}>
      {children}
    </SaveProductContext.Provider>
  );
};
