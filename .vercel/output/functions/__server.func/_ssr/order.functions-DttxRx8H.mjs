import { c as createSsrRpc } from "./router-CHbF3jR6.mjs";
import { c as createServerFn } from "./server-N1mLFSER.mjs";
import { o as objectType, s as stringType, a as anyType } from "../_libs/zod.mjs";
const getMyOrders = createServerFn({
  method: "GET"
}).handler(createSsrRpc("67a7c152bdf53f82f38d34472c67805cf35f485fd62a583b2eac1e91243eae9f"));
const getOrder = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  order_number: stringType()
}).parse(input)).handler(createSsrRpc("15cc7d5c26c719ce54787936b7219c4adc1f441a1e7766accf0a90623978a322"));
const getAdminOrders = createServerFn({
  method: "GET"
}).handler(createSsrRpc("01f2c9c6e643d1d53fcfb0b07c5cdbe4382203b20a282a7c8f904daef96def67"));
const updateOrderStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType(),
  status: stringType().optional(),
  payment_status: stringType().optional(),
  tracking_note: stringType().optional()
}).parse(input)).handler(createSsrRpc("f9a35b2de66abfcb15ca7b3cd14f1d1b7929aec992662edc8b3bf598c32b4bb3"));
const createOrder = createServerFn({
  method: "POST"
}).inputValidator((input) => anyType().parse(input)).handler(createSsrRpc("007e4e915d0f2bb0adeff3f4ba514dea8e2a5b5b4f81f74abf55e7a24731f494"));
export {
  getOrder as a,
  getAdminOrders as b,
  createOrder as c,
  getMyOrders as g,
  updateOrderStatus as u
};
