import { useContext } from "react";
import { CheckInputsContext } from "./CheckInputContext";

export const useCheckInputs = () => {
  const context = useContext(CheckInputsContext);

  if (context === undefined)
    throw new Error(
      "you can't access context outside of the CheckInputContext"
    );

  return context;
};
