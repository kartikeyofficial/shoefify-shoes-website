import { c as createServerRpc, a as connectDB, g as getServerUser, P as Product, O as Order, S as SupportMessage } from "./auth.server-C_0wWmFD.mjs";
import { c as createServerFn } from "./server-N1mLFSER.mjs";
import { s as serialize } from "./utils-BMt1ntSv.mjs";
import "../_libs/jsonwebtoken.mjs";
import "../_libs/mongoose.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
const getAdminStats_createServerFn_handler = createServerRpc({
  id: "4fec70c92c2624b017310f557d52373f6e45b4f5283a3272a864213d4d65e68d",
  name: "getAdminStats",
  filename: "src/lib/admin.functions.ts"
}, (opts) => getAdminStats.__executeServer(opts));
const getAdminStats = createServerFn({
  method: "GET"
}).handler(getAdminStats_createServerFn_handler, async () => {
  await connectDB();
  const user = await getServerUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");
  const [productsCount, orders, messagesCount] = await Promise.all([Product.countDocuments(), Order.find({}, "total status payment_status").lean(), SupportMessage.countDocuments({
    status: "new"
  })]);
  return serialize({
    products: productsCount,
    orders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    revenue: orders.filter((o) => o.payment_status === "paid").reduce((s, o) => s + Number(o.total), 0),
    messages: messagesCount
  });
});
export {
  getAdminStats_createServerFn_handler
};
