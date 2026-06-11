import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { connectDB } from "./db.server";
import { Product } from "./models.server";
import { getServerUser } from "./auth.server";
import { serialize } from "./utils";

export const getPublicProducts = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ categoryId: z.string().nullable().optional(), sort: z.string().optional() }).parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    let query: any = { is_active: true };
    if (data.categoryId) query.category_id = data.categoryId;
    
    let sortObj: any = { createdAt: -1 };
    if (data.sort === "price_asc") sortObj = { price: 1 };
    else if (data.sort === "price_desc") sortObj = { price: -1 };

    const products = await Product.find(query).sort(sortObj).lean();
    return serialize(products.map(p => ({
      ...p,
      _id: p._id.toString(),
      id: p._id.toString(),
      category_id: p.category_id?.toString() || null,
    })));
  });

export const getProducts = createServerFn({ method: "GET" }).handler(async () => {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return serialize(products.map(p => ({
    ...p,
    _id: p._id.toString(),
    id: p._id.toString(),
    category_id: p.category_id?.toString() || null,
  })));
});

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    const p = await Product.findOne({ slug: data.slug }).lean();
    if (!p) return null;
    return serialize({
      ...p,
      _id: p._id.toString(),
      id: p._id.toString(),
      category_id: p.category_id?.toString() || null,
    });
  });

export const createProduct = createServerFn({ method: "POST" })
  .inputValidator((input) => z.any().parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    const user = await getServerUser();
    if (!user || user.role !== "admin") throw new Error("Unauthorized");

    const p = new Product(data);
    await p.save();
    return { id: p._id.toString() };
  });

export const updateProduct = createServerFn({ method: "POST" })
  .inputValidator((input) => z.any().parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    const user = await getServerUser();
    if (!user || user.role !== "admin") throw new Error("Unauthorized");

    const { id, ...updateData } = data;
    await Product.findByIdAndUpdate(id, updateData);
    return { success: true };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    const user = await getServerUser();
    if (!user || user.role !== "admin") throw new Error("Unauthorized");

    await Product.findByIdAndDelete(data.id);
    return { success: true };
  });
