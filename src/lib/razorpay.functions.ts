import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { connectDB } from "./db.server";
import { Order } from "./models.server";
import { getServerUser } from "./auth.server";

export const getRazorpayKeyId = createServerFn({ method: "GET" }).handler(async () => {
  return { keyId: process.env.RAZORPAY_KEY_ID ?? "" };
});

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ orderId: z.string() }).parse(input))
  .handler(async ({ data }) => {
    await connectDB();
    const user = await getServerUser();
    if (!user) throw new Error("Unauthorized");

    const order = await Order.findById(data.orderId);
    if (!order) throw new Error("Order not found");
    if (order.user_id.toString() !== user.id) throw new Error("Forbidden");

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) throw new Error("Razorpay not configured");

    const amountPaise = Math.round(Number(order.total) * 100);
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: "INR",
        receipt: order.order_number,
        notes: { order_id: order._id.toString(), order_number: order.order_number },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Razorpay order create failed:", text);
      throw new Error("Failed to create Razorpay order");
    }

    const rzpOrder = (await res.json()) as { id: string };

    order.razorpay_order_id = rzpOrder.id;
    await order.save();

    return {
      keyId,
      razorpayOrderId: rzpOrder.id,
      amount: amountPaise,
      currency: "INR",
      orderNumber: order.order_number,
    };
  });

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({
      orderId: z.string(),
      razorpayOrderId: z.string().min(1),
      razorpayPaymentId: z.string().min(1),
      razorpaySignature: z.string().min(1),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    await connectDB();
    const user = await getServerUser();
    if (!user) throw new Error("Unauthorized");

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) throw new Error("Razorpay not configured");

    const { createHmac, timingSafeEqual } = await import("crypto");
    const expected = createHmac("sha256", keySecret)
      .update(`${data.razorpayOrderId}|${data.razorpayPaymentId}`)
      .digest("hex");

    const sigBuf = Buffer.from(data.razorpaySignature);
    const expBuf = Buffer.from(expected);
    const ok = sigBuf.length === expBuf.length && timingSafeEqual(sigBuf, expBuf);

    if (!ok) {
      await Order.findOneAndUpdate(
        { _id: data.orderId, user_id: user.id },
        { payment_status: "failed" }
      );
      throw new Error("Payment signature verification failed");
    }

    const updated = await Order.findOneAndUpdate(
      { _id: data.orderId, user_id: user.id },
      {
        payment_status: "paid",
        razorpay_payment_id: data.razorpayPaymentId,
        razorpay_signature: data.razorpaySignature,
      },
      { new: true }
    );

    if (!updated) throw new Error("Failed to update order");
    return { success: true, orderNumber: updated.order_number };
  });
