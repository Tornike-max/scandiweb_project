import { useContext } from "react";
import { SaveProductContext } from "./SaveProductContext";

const useSaveProductContext = () => {
  const context = useContext(SaveProductContext);

  if (context === undefined)
    throw new Error(
      "you can't access context outside of the SaveProductContext"
    );

  return context;
};

export default useSaveProductContext;
