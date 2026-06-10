import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { connectDB } from "./db";
import { Order, Product } from "./models";
import { getServerUser } from "./auth.server";
import { serialize } from "./utils";

export const getMyOrders = createServerFn({ method: "GET" }).handler(async () => {
  await connectDB();
  const user = await getServerUser();
  if (!user) throw new Error("Unauthorized");

  const orders = await Order.find({ user_id: user.id }).sort({ createdAt: -1 }).lean();
  return serialize(orders.map(o => ({ ...o, _id: o._id.toString(), id: o._id.toString() })));
});

export const getOrder = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ order_number: z.string() }).parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    const order = await Order.findOne({ order_number: data.order_number }).populate("items.product_id", "images").lean();
    if (!order) return null;
    
    // Map the populated product images so the frontend can easily access them
    const itemsWithImages = order.items.map((item: any) => ({
      ...item,
      image: item.product_id && item.product_id.images && item.product_id.images.length > 0 ? item.product_id.images[0] : null,
      product_id: item.product_id ? item.product_id._id.toString() : null
    }));

    return serialize({ ...order, items: itemsWithImages, _id: order._id.toString(), id: order._id.toString() });
  });

export const getAdminOrders = createServerFn({ method: "GET" }).handler(async () => {
  await connectDB();
  const user = await getServerUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");

  const orders = await Order.find().sort({ createdAt: -1 }).populate("items.product_id", "images").lean();
  
  const mappedOrders = orders.map((o: any) => {
    const itemsWithImages = o.items.map((item: any) => ({
      ...item,
      image: item.product_id && item.product_id.images && item.product_id.images.length > 0 ? item.product_id.images[0] : null,
      product_id: item.product_id ? item.product_id._id?.toString() : null
    }));
    return { ...o, items: itemsWithImages, _id: o._id.toString(), id: o._id.toString() };
  });

  return serialize(mappedOrders);
});

export const updateOrderStatus = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ 
    id: z.string(), 
    status: z.string().optional(),
    payment_status: z.string().optional(),
    tracking_note: z.string().optional()
  }).parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    const user = await getServerUser();
    if (!user || user.role !== "admin") throw new Error("Unauthorized");

    const { id, ...updateData } = data;
    await Order.findByIdAndUpdate(id, updateData);
    return { success: true };
  });

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((input) => z.any().parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    const user = await getServerUser();
    if (!user) throw new Error("Unauthorized");

    const order_number = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

    const order = new Order({
      user_id: user.id,
      order_number,
      total: data.total,
      shipping_address: data.shipping_address,
      items: data.items,
      payment_method: data.payment_method || "razorpay",
      status: "pending"
    });

    await order.save();
    return { id: order._id.toString(), order_number };
  });
