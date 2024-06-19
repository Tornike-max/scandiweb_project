import { z } from "zod";

const baseSchema = z.object({
  name: z.string().min(1, { message: "Please, submit required data" }),
  price: z.string().min(1, { message: "Please, submit required data" }),
  sku: z.string().min(1, { message: "Please, submit required data" }),
  type: z.string().min(1, { message: "Please, submit required data" }),
});

const dvdSchema = baseSchema.extend({
  size: z
    .string()
    .min(1, { message: "Please, submit required data" })
    .refine((value) => /^\d+$/.test(value), {
      message: "Please, provide the data of indicated type",
      path: ["size"],
    }),
});

const bookSchema = baseSchema.extend({
  weight: z
    .string()
    .min(1, { message: "Please, submit required data" })
    .refine((value) => /^\d+$/.test(value), {
      message: "Please, provide the data of indicated type",
      path: ["weight"],
    }),
});

const furnitureSchema = baseSchema.extend({
  height: z
    .string()
    .min(1, { message: "Please, submit required data" })
    .refine((value) => /^\d+(\.\d+)?$/.test(value), {
      message: "Please, provide the data of indicated type",
      path: ["height"],
    }),
  width: z
    .string()
    .min(1, { message: "Please, submit required data" })
    .refine((value) => /^\d+(\.\d+)?$/.test(value), {
      message: "Please, provide the data of indicated type",
      path: ["width"],
    }),
  length: z
    .string()
    .min(1, { message: "Please, submit required data" })
    .refine((value) => /^\d+(\.\d+)?$/.test(value), {
      message: "Please, provide the data of indicated type",
      path: ["length"],
    }),
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
    message: "Please, provide the data of indicated type",
    path: ["type"],
  }
);
