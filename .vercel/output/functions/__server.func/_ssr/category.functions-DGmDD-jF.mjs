import { c as createServerRpc, a as connectDB, C as Category, g as getServerUser } from "./auth.server-Dl5Ha1_2.mjs";
import { c as createServerFn } from "./server-CR7JDUVD.mjs";
import { s as serialize } from "./utils-BMt1ntSv.mjs";
import "../_libs/jsonwebtoken.mjs";
import "../_libs/mongoose.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, s as stringType } from "../_libs/zod.mjs";
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
const getCategories_createServerFn_handler = createServerRpc({
  id: "3fcd3cd0c54ec425c65b3afab76d818a2640068ae289f23950642a6fd946447b",
  name: "getCategories",
  filename: "src/lib/category.functions.ts"
}, (opts) => getCategories.__executeServer(opts));
const getCategories = createServerFn({
  method: "GET"
}).handler(getCategories_createServerFn_handler, async () => {
  await connectDB();
  const cats = await Category.find().sort({
    sort_order: 1
  }).lean();
  return serialize(cats.map((c) => ({
    ...c,
    _id: c._id.toString(),
    id: c._id.toString(),
    // Also we need slug for categories, adding it on the fly if missing
    slug: c.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
  })));
});
const createCategory_createServerFn_handler = createServerRpc({
  id: "1fd7a1cbb41e3c90e0ce7ecf4933cf3c8f78e3c65bcc7912be5b34a083868ca6",
  name: "createCategory",
  filename: "src/lib/category.functions.ts"
}, (opts) => createCategory.__executeServer(opts));
const createCategory = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  name: stringType(),
  sort_order: numberType().optional()
}).parse(input)).handler(createCategory_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  const user = await getServerUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");
  const c = new Category(data);
  await c.save();
  return {
    id: c._id.toString()
  };
});
const updateCategory_createServerFn_handler = createServerRpc({
  id: "c1513fd340e368df1cd6fa34140686b2261483797a4a1d351f274c844ffc6df1",
  name: "updateCategory",
  filename: "src/lib/category.functions.ts"
}, (opts) => updateCategory.__executeServer(opts));
const updateCategory = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType(),
  name: stringType(),
  sort_order: numberType().optional()
}).parse(input)).handler(updateCategory_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  const user = await getServerUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");
  const {
    id,
    ...updateData
  } = data;
  await Category.findByIdAndUpdate(id, updateData);
  return {
    success: true
  };
});
const deleteCategory_createServerFn_handler = createServerRpc({
  id: "f00b1b3697d9da4487b6bfbb64feeb6c5c6e02d6d09275a2d82bfe090fad4cc4",
  name: "deleteCategory",
  filename: "src/lib/category.functions.ts"
}, (opts) => deleteCategory.__executeServer(opts));
const deleteCategory = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType()
}).parse(input)).handler(deleteCategory_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  const user = await getServerUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");
  await Category.findByIdAndDelete(data.id);
  return {
    success: true
  };
});
export {
  createCategory_createServerFn_handler,
  deleteCategory_createServerFn_handler,
  getCategories_createServerFn_handler,
  updateCategory_createServerFn_handler
};
