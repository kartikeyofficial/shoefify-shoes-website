import { c as createSsrRpc } from "./router-CHbF3jR6.mjs";
import { c as createServerFn } from "./server-N1mLFSER.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
const getMessages = createServerFn({
  method: "GET"
}).handler(createSsrRpc("4f53424af2eaa5ce58973d9bafa1dbfd42cc414b7de68fec825b2826fcee6098"));
const createMessage = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  name: stringType(),
  email: stringType().email(),
  subject: stringType().optional(),
  message: stringType(),
  type: stringType().optional()
}).parse(input)).handler(createSsrRpc("fdca9a79bc72530fa59aa98a2de7aa76dc8e24476b8cf4c6bbfd1d7c5acfbd4c"));
const updateMessage = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType(),
  status: stringType().optional(),
  admin_response: stringType().optional()
}).parse(input)).handler(createSsrRpc("5485021166982dc5711a65d6ee6fbd723d324c7af147ec3e1cdbad3af11967e9"));
export {
  createMessage as c,
  getMessages as g,
  updateMessage as u
};
