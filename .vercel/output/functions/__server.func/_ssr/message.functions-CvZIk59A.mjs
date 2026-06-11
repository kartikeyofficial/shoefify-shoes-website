import { c as createServerRpc, a as connectDB, g as getServerUser, S as SupportMessage } from "./auth.server-C_0wWmFD.mjs";
import { c as createServerFn } from "./server-N1mLFSER.mjs";
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
const getMessages_createServerFn_handler = createServerRpc({
  id: "4f53424af2eaa5ce58973d9bafa1dbfd42cc414b7de68fec825b2826fcee6098",
  name: "getMessages",
  filename: "src/lib/message.functions.ts"
}, (opts) => getMessages.__executeServer(opts));
const getMessages = createServerFn({
  method: "GET"
}).handler(getMessages_createServerFn_handler, async () => {
  await connectDB();
  const user = await getServerUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");
  const messages = await SupportMessage.find().sort({
    createdAt: -1
  }).lean();
  return serialize(messages.map((m) => ({
    ...m,
    _id: m._id.toString(),
    id: m._id.toString()
  })));
});
const createMessage_createServerFn_handler = createServerRpc({
  id: "fdca9a79bc72530fa59aa98a2de7aa76dc8e24476b8cf4c6bbfd1d7c5acfbd4c",
  name: "createMessage",
  filename: "src/lib/message.functions.ts"
}, (opts) => createMessage.__executeServer(opts));
const createMessage = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  name: stringType(),
  email: stringType().email(),
  subject: stringType().optional(),
  message: stringType(),
  type: stringType().optional()
}).parse(input)).handler(createMessage_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  const msg = new SupportMessage(data);
  await msg.save();
  return {
    success: true
  };
});
const updateMessage_createServerFn_handler = createServerRpc({
  id: "5485021166982dc5711a65d6ee6fbd723d324c7af147ec3e1cdbad3af11967e9",
  name: "updateMessage",
  filename: "src/lib/message.functions.ts"
}, (opts) => updateMessage.__executeServer(opts));
const updateMessage = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  id: stringType(),
  status: stringType().optional(),
  admin_response: stringType().optional()
}).parse(input)).handler(updateMessage_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  const user = await getServerUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");
  const {
    id,
    ...updateData
  } = data;
  await SupportMessage.findByIdAndUpdate(id, updateData);
  return {
    success: true
  };
});
export {
  createMessage_createServerFn_handler,
  getMessages_createServerFn_handler,
  updateMessage_createServerFn_handler
};
