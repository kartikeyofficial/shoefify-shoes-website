import { c as createServerRpc, a as connectDB, g as getServerUser, W as Wishlist } from "./auth.server-DFBqw7e2.mjs";
import { c as createServerFn } from "./server-DRQnurSj.mjs";
import { s as serialize } from "./utils-BMt1ntSv.mjs";
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
const toggleWishlistItem_createServerFn_handler = createServerRpc({
  id: "8885861039572e17b151c0588957f0e59300c2ba8d7e1673c4c710b2a18a91dd",
  name: "toggleWishlistItem",
  filename: "src/lib/wishlist.functions.ts"
}, (opts) => toggleWishlistItem.__executeServer(opts));
const toggleWishlistItem = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  productId: stringType()
}).parse(input)).handler(toggleWishlistItem_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  const user = await getServerUser();
  if (!user) throw new Error("Unauthorized");
  const existing = await Wishlist.findOne({
    user_id: user.id,
    product_id: data.productId
  });
  if (existing) {
    await Wishlist.findByIdAndDelete(existing._id);
    return {
      added: false
    };
  } else {
    const newItem = new Wishlist({
      user_id: user.id,
      product_id: data.productId
    });
    await newItem.save();
    return {
      added: true
    };
  }
});
const getWishlistItems_createServerFn_handler = createServerRpc({
  id: "c1af8c3ef795622140f5443fd03b2f7f24a45b72e3fa702eaaa5eb94dc49f8de",
  name: "getWishlistItems",
  filename: "src/lib/wishlist.functions.ts"
}, (opts) => getWishlistItems.__executeServer(opts));
const getWishlistItems = createServerFn({
  method: "GET"
}).handler(getWishlistItems_createServerFn_handler, async () => {
  await connectDB();
  const user = await getServerUser();
  if (!user) return [];
  const items = await Wishlist.find({
    user_id: user.id
  }).populate("product_id").sort({
    createdAt: -1
  }).lean();
  return serialize(items.map((item) => ({
    _id: item._id.toString(),
    id: item._id.toString(),
    product: item.product_id ? {
      ...item.product_id,
      _id: item.product_id._id.toString(),
      id: item.product_id._id.toString(),
      category_id: item.product_id.category_id?.toString() || null
    } : null,
    createdAt: item.createdAt
  })).filter((i) => i.product));
});
const getWishlistCount_createServerFn_handler = createServerRpc({
  id: "a8fa38492d5ee54e688bb1e4061c06f3af62693959d1ae650dbe29455400a108",
  name: "getWishlistCount",
  filename: "src/lib/wishlist.functions.ts"
}, (opts) => getWishlistCount.__executeServer(opts));
const getWishlistCount = createServerFn({
  method: "GET"
}).handler(getWishlistCount_createServerFn_handler, async () => {
  await connectDB();
  const user = await getServerUser();
  if (!user) return 0;
  const count = await Wishlist.countDocuments({
    user_id: user.id
  });
  return count;
});
export {
  getWishlistCount_createServerFn_handler,
  getWishlistItems_createServerFn_handler,
  toggleWishlistItem_createServerFn_handler
};
