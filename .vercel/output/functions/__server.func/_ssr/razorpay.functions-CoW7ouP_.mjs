import { c as createServerRpc, a as connectDB, g as getServerUser, O as Order } from "./auth.server-Dl5Ha1_2.mjs";
import { c as createServerFn } from "./server-CR7JDUVD.mjs";
import { createHmac, timingSafeEqual } from "crypto";
import "../_libs/jsonwebtoken.mjs";
import "../_libs/mongoose.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/jws.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/jwa.mjs";
import "../_libs/ecdsa-sig-formatter.mjs";
import "../_libs/buffer-equal-constant-time.mjs";
import "../_libs/ms.mjs";
import "../_libs/semver.mjs";
import "../_libs/lodash.includes.mjs";
import "../_libs/lodash.isboolean.mjs";
import "../_libs/lodash.isinteger.mjs";
import "../_libs/lodash.isnumber.mjs";
import "../_libs/lodash.isplainobject.mjs";
import "../_libs/lodash.isstring.mjs";
import "../_libs/lodash.once.mjs";
import "events";
import "assert";
import "../_libs/mongodb.mjs";
import "fs";
import "http";
import "process";
import "timers";
import "timers/promises";
import "dns";
import "url";
import "zlib";
import "net";
import "fs/promises";
import "tls";
import "child_process";
import "../_libs/bson.mjs";
import "../_libs/mongodb-connection-string-url.mjs";
import "../_libs/whatwg-url.mjs";
import "../_libs/webidl-conversions.mjs";
import "../_libs/tr46.mjs";
import "../_libs/punycode.mjs";
import "../_libs/mongodb-js__saslprep.mjs";
import "../_libs/sparse-bitfield.mjs";
import "../_libs/memory-pager.mjs";
import "../_libs/kareem.mjs";
import "../_libs/mpath.mjs";
import "../_libs/mquery.mjs";
import "../_libs/sift.mjs";
const getRazorpayKeyId_createServerFn_handler = createServerRpc({
  id: "cb689f3d061cfb052139f5bf15f608371ea7bcd6aa63226ef5b96d12eef1c639",
  name: "getRazorpayKeyId",
  filename: "src/lib/razorpay.functions.ts"
}, (opts) => getRazorpayKeyId.__executeServer(opts));
const getRazorpayKeyId = createServerFn({
  method: "GET"
}).handler(getRazorpayKeyId_createServerFn_handler, async () => {
  return {
    keyId: process.env.RAZORPAY_KEY_ID ?? ""
  };
});
const createRazorpayOrder_createServerFn_handler = createServerRpc({
  id: "a6f1a7df2dd032270b33ae7f01da2576971e1b7652c3d182f28f0f762ce126d4",
  name: "createRazorpayOrder",
  filename: "src/lib/razorpay.functions.ts"
}, (opts) => createRazorpayOrder.__executeServer(opts));
const createRazorpayOrder = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  orderId: stringType()
}).parse(input)).handler(createRazorpayOrder_createServerFn_handler, async ({
  data
}) => {
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
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: amountPaise,
      currency: "INR",
      receipt: order.order_number,
      notes: {
        order_id: order._id.toString(),
        order_number: order.order_number
      }
    })
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Razorpay order create failed:", text);
    throw new Error("Failed to create Razorpay order");
  }
  const rzpOrder = await res.json();
  order.razorpay_order_id = rzpOrder.id;
  await order.save();
  return {
    keyId,
    razorpayOrderId: rzpOrder.id,
    amount: amountPaise,
    currency: "INR",
    orderNumber: order.order_number
  };
});
const verifyRazorpayPayment_createServerFn_handler = createServerRpc({
  id: "5e2c6a85ce8b9f3a92cd9b0a9b4d8f015d9ec2fa0b30eb31f8605ecef9f67199",
  name: "verifyRazorpayPayment",
  filename: "src/lib/razorpay.functions.ts"
}, (opts) => verifyRazorpayPayment.__executeServer(opts));
const verifyRazorpayPayment = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  orderId: stringType(),
  razorpayOrderId: stringType().min(1),
  razorpayPaymentId: stringType().min(1),
  razorpaySignature: stringType().min(1)
}).parse(input)).handler(verifyRazorpayPayment_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  const user = await getServerUser();
  if (!user) throw new Error("Unauthorized");
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) throw new Error("Razorpay not configured");
  const expected = createHmac("sha256", keySecret).update(`${data.razorpayOrderId}|${data.razorpayPaymentId}`).digest("hex");
  const sigBuf = Buffer.from(data.razorpaySignature);
  const expBuf = Buffer.from(expected);
  const ok = sigBuf.length === expBuf.length && timingSafeEqual(sigBuf, expBuf);
  if (!ok) {
    await Order.findOneAndUpdate({
      _id: data.orderId,
      user_id: user.id
    }, {
      payment_status: "failed"
    });
    throw new Error("Payment signature verification failed");
  }
  const updated = await Order.findOneAndUpdate({
    _id: data.orderId,
    user_id: user.id
  }, {
    payment_status: "paid",
    razorpay_payment_id: data.razorpayPaymentId,
    razorpay_signature: data.razorpaySignature
  }, {
    new: true
  });
  if (!updated) throw new Error("Failed to update order");
  return {
    success: true,
    orderNumber: updated.order_number
  };
});
export {
  createRazorpayOrder_createServerFn_handler,
  getRazorpayKeyId_createServerFn_handler,
  verifyRazorpayPayment_createServerFn_handler
};
