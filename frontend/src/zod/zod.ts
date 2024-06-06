import { z } from "zod";

const baseSchema = z.object({
  name: z.string().min(1, { message: "This field is required" }),
  price: z.string().min(1, { message: "This field is required" }),
  sku: z.string().min(1, { message: "This field is required" }),
  type: z.string().min(1, { message: "This field is required" }),
});

const dvdSchema = baseSchema.extend({
  size: z.string().min(1, { message: "This field is required" }),
});

const bookSchema = baseSchema.extend({
  weight: z.string().min(1, { message: "This field is required" }),
});

const furnitureSchema = baseSchema.extend({
  height: z.string().min(1, { message: "This field is required" }),
  width: z.string().min(1, { message: "This field is required" }),
  length: z.string().min(1, { message: "This field is required" }),
});

export const schema = z.union([dvdSchema, bookSchema, furnitureSchema]).refine(
  (data) => {
    switch (data.type) {
      case "dvd":
        return dvdSchema.safeParse(data).success;
      case "book":
        return bookSchema.safeParse(data).success;
      case "furniture":
        return furnitureSchema.safeParse(data).success;
      default:
        return false;
    }
  },
  {
    message: "Invalid product type or missing required fields for the type",
    path: ["type"],
  }
);
