import axios from "axios";
import { ProductType } from "../types/types";

export const addProductApi = async (data: ProductType) => {
  try {
    const response = await axios.post("http://localhost:8080/addproduct", data);
    if (response.status !== 200) {
      throw new Error(`An error occurred: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An axios error occurred"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getProductsApi = async () => {
  try {
    const response = await axios.get("http://localhost:8080/products");
    if (response.status !== 200) {
      throw new Error(`An error occurred: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An axios error occurred"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const deleteProductApi = async (productIds: string[]) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/productDelete",
      productIds
    );
    if (response.status !== 200) {
      throw new Error(`An error occurred: ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An axios error occurred"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
