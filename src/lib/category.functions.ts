import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { connectDB } from "./db.server";
import { Category } from "./models.server";
import { getServerUser } from "./auth.server";
import { serialize } from "./utils";

export const getCategories = createServerFn({ method: "GET" }).handler(async () => {
  await connectDB();
  const cats = await Category.find().sort({ sort_order: 1 }).lean();
  return serialize(cats.map(c => ({
    ...c,
    _id: c._id.toString(),
    id: c._id.toString(),
    // Also we need slug for categories, adding it on the fly if missing
    slug: c.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-"),
  })));
});

export const createCategory = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ name: z.string(), sort_order: z.number().optional() }).parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    const user = await getServerUser();
    if (!user || user.role !== "admin") throw new Error("Unauthorized");

    const c = new Category(data);
    await c.save();
    return { id: c._id.toString() };
  });

export const updateCategory = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string(), name: z.string(), sort_order: z.number().optional() }).parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    const user = await getServerUser();
    if (!user || user.role !== "admin") throw new Error("Unauthorized");

    const { id, ...updateData } = data;
    await Category.findByIdAndUpdate(id, updateData);
    return { success: true };
  });

export const deleteCategory = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    const user = await getServerUser();
    if (!user || user.role !== "admin") throw new Error("Unauthorized");

    await Category.findByIdAndDelete(data.id);
    return { success: true };
  });
