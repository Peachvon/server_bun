// import { getAllUser } from "@controllers/user_controller";
import { getAllUser } from "@controllers/user_controller";
import { Context, Elysia, t } from "elysia";

// src/models/product.model.ts

export const ProductModel = {
  // Base schema with detailed types and validations
  base: t.Object({
    name: t.String({
      minLength: 3,
      maxLength: 100,
      description: "Product name (3-100 characters)",
      error: "Product name must be between 3 and 100 characters",
    }),
    price: t.Number({
      minimum: 0,
      maximum: 1000000,
      description: "Product price (0-1,000,000)",
      error: "Price must be between 0 and 1,000,000",
    }),

    stock: t.Optional(
      t.Number({
        minimum: 0,
        description: "Available stock quantity (optional)",
        error: "Stock must be a positive number",
      })
    ),
    category: t.Enum({
      // options: ["electronics", "clothing", "food"] as const,
      description: "Product category",
      error: "Invalid category. Must be one of: electronics, clothing, food",
    }),
    status: t.Union(
      [t.Literal("active"), t.Literal("inactive"), t.Literal("discontinued")],
      {
        description: "Product status",
        error: "Invalid status. Must be: active, inactive, or discontinued",
      }
    ),
  }),
};
export const userRouter = new Elysia();

userRouter.get("/get-all", getAllUser, {
  detail: {
    tags: ["User"],
    description: "Retrieve a specific user by their ID",
  },
  query: t.Object({
    skip: t.Optional(t.Number({ minimum: 0 })),
    take: t.Optional(t.Number({ minimum: 1 })),
  }),
});

userRouter.get(
  "/create/:id",
  () => {
    return { name: "peachvoid" };
  },
  {
    detail: {
      tags: ["User"],
      description: "สร้าง User",
    },
    params: t.Object({
      id: t.Number(),
    }),
    body: t.Object({
      name: t.String(),
      age: t.Number(),
      isCanAdd: t.Boolean(),
    }),
    query: t.Object({
      name: t.String(),
      age: t.Number(),
    }),
  }
);
