import { c as createServerRpc, a as connectDB, P as Product, g as getServerUser } from "./auth.server-Dl5Ha1_2.mjs";
import { c as createServerFn } from "./server-CR7JDUVD.mjs";
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
const getPublicProducts_createServerFn_handler = createServerRpc({
  id: "df6c098901015d59424b1491cbf87cfb2677d634a68de825940aa31f110020d9",
  name: "getPublicProducts",
  filename: "src/lib/product.functions.ts"
}, (opts) => getPublicProducts.__executeServer(opts));
const getPublicProducts = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  categoryId: stringType().nullable().optional(),
  sort: stringType().optional()
}).parse(input)).handler(getPublicProducts_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  let query = {
    is_active: true
  };
  if (data.categoryId) query.category_id = data.categoryId;
  let sortObj = {
    createdAt: -1
  };
  if (data.sort === "price_asc") sortObj = {
    price: 1
  };
  else if (data.sort === "price_desc") sortObj = {
    price: -1
  };
  const products = await Product.find(query).sort(sortObj).lean();
  return serialize(products.map((p) => ({
    ...p,
    _id: p._id.toString(),
    id: p._id.toString(),
    category_id: p.category_id?.toString() || null
  })));
});
const getProducts_createServerFn_handler = createServerRpc({
  id: "d608aaa61b4e5c2f35d1ec28b724cc7e6cef5bceed6e8b00cc0acc63d34fa8d8",
  name: "getProducts",
  filename: "src/lib/product.functions.ts"
}, (opts) => getProducts.__executeServer(opts));
const getProducts = createServerFn({
  method: "GET"
}).handler(getProducts_createServerFn_handler, async () => {
  await connectDB();
  const products = await Product.find().sort({
    createdAt: -1
  }).lean();
  return serialize(products.map((p) => ({
    ...p,
    _id: p._id.toString(),
    id: p._id.toString(),
    category_id: p.category_id?.toString() || null
  })));
});
const getProductBySlug_createServerFn_handler = createServerRpc({
  id: "ca9e65b8e38a3ce3ad6648d014aeaaeff3e106300b50e6c785ce743992fd7f1f",
  name: "getProductBySlug",
  filename: "src/lib/product.functions.ts"
}, (opts) => getProductBySlug.__executeServer(opts));
const getProductBySlug = createServerFn({
  method: "GET"
}).inputValidator((input) => objectType({
  slug: stringType()
}).parse(input)).handler(getProductBySlug_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  const p = await Product.findOne({
    slug: data.slug
  }).lean();
  if (!p) return null;
  return serialize({
    ...p,
    _id: p._id.toString(),
    id: p._id.toString(),
    category_id: p.category_id?.toString() || null
  });
});
const createProduct_createServerFn_handler = createServerRpc({
  id: "158223c946aff79e82c00001be82e339aac9d79d1f1dc30104f013df45402e93",
  name: "createProduct",
  filename: "src/lib/product.functions.ts"
}, (opts) => createProduct.__executeServer(opts));
const createProduct = createServerFn({
  method: "POST"
}).inputValidator((input) => anyType().parse(input)).handler(createProduct_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  const user = await getServerUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");
  const p = new Product(data);
  await p.save();
  return {
    id: p._id.toString()
  };
});
const updateProduct_createServerFn_handler = createServerRpc({
  id: "11c72686a146e32d5c7f923124c70ff6a3efbd63ff8d6e9300b437b858391084",
  name: "updateProduct",
  filename: "src/lib/product.functions.ts"
}, (opts) => updateProduct.__executeServer(opts));
const updateProduct = createServerFn({
  method: "POST"
}).inputValidator((input) => anyType().parse(input)).handler(updateProduct_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  const user = await getServerUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");
  const {
    id,
    ...updateData
  } = data;
  await Product.findByIdAndUpdate(id, updateData);
  return {
    success: true
  };
});
const deleteProduct_createServerFn_handler = createServerRpc({
  id: "10cc5b7a83d5f2a0269cb4e80439dc0f8d778b1b9c90e7bb6c91b959fd78c730",
  name: "deleteProduct",
  filename: "src/lib/product.functions.ts"
}, (opts) => deleteProduct.__executeServer(opts));
const deleteProduct = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType()
}).parse(input)).handler(deleteProduct_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  const user = await getServerUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");
  await Product.findByIdAndDelete(data.id);
  return {
    success: true
  };
});
export {
  createProduct_createServerFn_handler,
  deleteProduct_createServerFn_handler,
  getProductBySlug_createServerFn_handler,
  getProducts_createServerFn_handler,
  getPublicProducts_createServerFn_handler,
  updateProduct_createServerFn_handler
};
