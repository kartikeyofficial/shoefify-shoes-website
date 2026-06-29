import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { connectDB } from "./db.server";
import { Wishlist, Product } from "./models.server";
import { getServerUser } from "./auth.server";
import { serialize } from "./utils";

export const toggleWishlistItem = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ productId: z.string() }).parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    const user = await getServerUser();
    if (!user) throw new Error("Unauthorized");

    const existing = await Wishlist.findOne({ user_id: user.id, product_id: data.productId });
    
    if (existing) {
      await Wishlist.findByIdAndDelete(existing._id);
      return { added: false };
    } else {
      const newItem = new Wishlist({ user_id: user.id, product_id: data.productId });
      await newItem.save();
      return { added: true };
    }
  });

export const getWishlistItems = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectDB();
    const user = await getServerUser();
    if (!user) return [];

    const items = await Wishlist.find({ user_id: user.id })
      .populate("product_id")
      .sort({ createdAt: -1 })
      .lean();
      
    return serialize(items.map((item: any) => ({
      _id: item._id.toString(),
      id: item._id.toString(),
      product: item.product_id ? {
        ...item.product_id,
        _id: item.product_id._id.toString(),
        id: item.product_id._id.toString(),
        category_id: item.product_id.category_id?.toString() || null,
      } : null,
      createdAt: item.createdAt,
    })).filter((i: any) => i.product));
  });

export const getWishlistCount = createServerFn({ method: "GET" })
  .handler(async () => {
    await connectDB();
    const user = await getServerUser();
    if (!user) return 0;

    const count = await Wishlist.countDocuments({ user_id: user.id });
    return count;
  });
