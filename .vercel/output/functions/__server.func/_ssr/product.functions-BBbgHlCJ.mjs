import { c as createSsrRpc } from "./router-CHbF3jR6.mjs";
import { c as createServerFn } from "./server-N1mLFSER.mjs";
import { o as objectType, s as stringType, a as anyType } from "../_libs/zod.mjs";
const getPublicProducts = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  categoryId: stringType().nullable().optional(),
  sort: stringType().optional()
}).parse(input)).handler(createSsrRpc("df6c098901015d59424b1491cbf87cfb2677d634a68de825940aa31f110020d9"));
const getProducts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("d608aaa61b4e5c2f35d1ec28b724cc7e6cef5bceed6e8b00cc0acc63d34fa8d8"));
const getProductBySlug = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  slug: stringType()
}).parse(input)).handler(createSsrRpc("ca9e65b8e38a3ce3ad6648d014aeaaeff3e106300b50e6c785ce743992fd7f1f"));
const createProduct = createServerFn({
  method: "POST"
}).inputValidator((input) => anyType().parse(input)).handler(createSsrRpc("158223c946aff79e82c00001be82e339aac9d79d1f1dc30104f013df45402e93"));
const updateProduct = createServerFn({
  method: "POST"
}).inputValidator((input) => anyType().parse(input)).handler(createSsrRpc("11c72686a146e32d5c7f923124c70ff6a3efbd63ff8d6e9300b437b858391084"));
const deleteProduct = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType()
}).parse(input)).handler(createSsrRpc("10cc5b7a83d5f2a0269cb4e80439dc0f8d778b1b9c90e7bb6c91b959fd78c730"));
export {
  getProductBySlug as a,
  getProducts as b,
  createProduct as c,
  deleteProduct as d,
  getPublicProducts as g,
  updateProduct as u
};
