import { c as createServerRpc, a as connectDB, g as getServerUser, O as Order } from "./auth.server-C_0wWmFD.mjs";
import { c as createServerFn } from "./server-N1mLFSER.mjs";
import { s as serialize } from "./utils-BMt1ntSv.mjs";
import "../_libs/jsonwebtoken.mjs";
import "../_libs/mongoose.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, a as anyType } from "../_libs/zod.mjs";
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
import "crypto";
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
const getMyOrders_createServerFn_handler = createServerRpc({
  id: "67a7c152bdf53f82f38d34472c67805cf35f485fd62a583b2eac1e91243eae9f",
  name: "getMyOrders",
  filename: "src/lib/order.functions.ts"
}, (opts) => getMyOrders.__executeServer(opts));
const getMyOrders = createServerFn({
  method: "GET"
}).handler(getMyOrders_createServerFn_handler, async () => {
  await connectDB();
  const user = await getServerUser();
  if (!user) throw new Error("Unauthorized");
  const orders = await Order.find({
    user_id: user.id
  }).sort({
    createdAt: -1
  }).lean();
  return serialize(orders.map((o) => ({
    ...o,
    _id: o._id.toString(),
    id: o._id.toString()
  })));
});
const getOrder_createServerFn_handler = createServerRpc({
  id: "15cc7d5c26c719ce54787936b7219c4adc1f441a1e7766accf0a90623978a322",
  name: "getOrder",
  filename: "src/lib/order.functions.ts"
}, (opts) => getOrder.__executeServer(opts));
const getOrder = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  order_number: stringType()
}).parse(input)).handler(getOrder_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  const order = await Order.findOne({
    order_number: data.order_number
  }).populate("items.product_id", "images").lean();
  if (!order) return null;
  const itemsWithImages = order.items.map((item) => ({
    ...item,
    image: item.product_id && item.product_id.images && item.product_id.images.length > 0 ? item.product_id.images[0] : null,
    product_id: item.product_id ? item.product_id._id.toString() : null
  }));
  return serialize({
    ...order,
    items: itemsWithImages,
    _id: order._id.toString(),
    id: order._id.toString()
  });
});
const getAdminOrders_createServerFn_handler = createServerRpc({
  id: "01f2c9c6e643d1d53fcfb0b07c5cdbe4382203b20a282a7c8f904daef96def67",
  name: "getAdminOrders",
  filename: "src/lib/order.functions.ts"
}, (opts) => getAdminOrders.__executeServer(opts));
const getAdminOrders = createServerFn({
  method: "GET"
}).handler(getAdminOrders_createServerFn_handler, async () => {
  await connectDB();
  const user = await getServerUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");
  const orders = await Order.find().sort({
    createdAt: -1
  }).populate("items.product_id", "images").lean();
  const mappedOrders = orders.map((o) => {
    const itemsWithImages = o.items.map((item) => ({
      ...item,
      image: item.product_id && item.product_id.images && item.product_id.images.length > 0 ? item.product_id.images[0] : null,
      product_id: item.product_id ? item.product_id._id?.toString() : null
    }));
    return {
      ...o,
      items: itemsWithImages,
      _id: o._id.toString(),
      id: o._id.toString()
    };
  });
  return serialize(mappedOrders);
});
const updateOrderStatus_createServerFn_handler = createServerRpc({
  id: "f9a35b2de66abfcb15ca7b3cd14f1d1b7929aec992662edc8b3bf598c32b4bb3",
  name: "updateOrderStatus",
  filename: "src/lib/order.functions.ts"
}, (opts) => updateOrderStatus.__executeServer(opts));
const updateOrderStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType(),
  status: stringType().optional(),
  payment_status: stringType().optional(),
  tracking_note: stringType().optional()
}).parse(input)).handler(updateOrderStatus_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  const user = await getServerUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");
  const {
    id,
    ...updateData
  } = data;
  await Order.findByIdAndUpdate(id, updateData);
  return {
    success: true
  };
});
const createOrder_createServerFn_handler = createServerRpc({
  id: "007e4e915d0f2bb0adeff3f4ba514dea8e2a5b5b4f81f74abf55e7a24731f494",
  name: "createOrder",
  filename: "src/lib/order.functions.ts"
}, (opts) => createOrder.__executeServer(opts));
const createOrder = createServerFn({
  method: "POST"
}).inputValidator((input) => anyType().parse(input)).handler(createOrder_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  const user = await getServerUser();
  if (!user) throw new Error("Unauthorized");
  const order_number = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1e3)}`;
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
  return {
    id: order._id.toString(),
    order_number
  };
});
export {
  createOrder_createServerFn_handler,
  getAdminOrders_createServerFn_handler,
  getMyOrders_createServerFn_handler,
  getOrder_createServerFn_handler,
  updateOrderStatus_createServerFn_handler
};
