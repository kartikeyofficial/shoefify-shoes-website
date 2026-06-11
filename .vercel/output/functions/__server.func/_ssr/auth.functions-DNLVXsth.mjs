import { c as createServerRpc, a as connectDB, U as User, g as getServerUser } from "./auth.server-C_0wWmFD.mjs";
import { c as createServerFn, s as setCookie, d as getCookie, e as deleteCookie } from "./server-N1mLFSER.mjs";
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
const sendOtp_createServerFn_handler = createServerRpc({
  id: "3d5e698f221dd29c57219887dc5962cf2d5363d4eb2f301862ec416ee612548b",
  name: "sendOtp",
  filename: "src/lib/auth.functions.ts"
}, (opts) => sendOtp.__executeServer(opts));
const sendOtp = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  email: stringType().email()
}).parse(input)).handler(sendOtp_createServerFn_handler, async ({
  data
}) => {
  if (!process.env.MONGODB_URI) throw new Error("Database not configured. Please add MONGODB_URI to .env");
  if (!process.env.NODEMAILER_EMAIL || !process.env.NODEMAILER_PASSWORD) {
    throw new Error("Email provider not configured. Please add NODEMAILER credentials to .env");
  }
  await connectDB();
  const email = data.email.trim().toLowerCase();
  const otp = Math.floor(1e5 + Math.random() * 9e5).toString();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1e3);
  let user = await User.findOne({
    email
  });
  if (!user) {
    user = new User({
      email,
      role: "user"
    });
  }
  user.otp = otp;
  user.otpExpiresAt = otpExpiresAt;
  await user.save();
  const nodemailer = (await import("../_libs/nodemailer.mjs").then(function(n) {
    return n.n;
  })).default;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });
  await transporter.sendMail({
    from: `"Shoefify" <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject: "Your Shoefify Verification Code",
    text: `Your verification code is: ${otp}. It will expire in 10 minutes.`,
    html: `<p>Your verification code is: <b style="font-size: 20px;">${otp}</b></p><p>It will expire in 10 minutes.</p>`
  });
  return {
    success: true
  };
});
const verifyOtp_createServerFn_handler = createServerRpc({
  id: "9a8e9c246ad5eb913400de7bc2aa33f95e62ce293d5c7fcf0d4a8f2148dd7943",
  name: "verifyOtp",
  filename: "src/lib/auth.functions.ts"
}, (opts) => verifyOtp.__executeServer(opts));
const verifyOtp = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  email: stringType().email(),
  otp: stringType().length(6)
}).parse(input)).handler(verifyOtp_createServerFn_handler, async ({
  data
}) => {
  await connectDB();
  const email = data.email.trim().toLowerCase();
  const user = await User.findOne({
    email
  });
  if (!user || user.otp !== data.otp) {
    throw new Error("Invalid verification code");
  }
  if (user.otpExpiresAt && user.otpExpiresAt < /* @__PURE__ */ new Date()) {
    throw new Error("Verification code has expired");
  }
  user.otp = void 0;
  user.otpExpiresAt = void 0;
  await user.save();
  const jwt = (await import("../_libs/jsonwebtoken.mjs").then(function(n) {
    return n.i;
  })).default;
  const jwtSecret = process.env.JWT_SECRET || "fallback_secret_please_change_in_production";
  const token = jwt.sign({
    userId: user._id.toString(),
    email: user.email,
    role: user.role
  }, jwtSecret, {
    expiresIn: "30d"
  });
  setCookie("auth_token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60,
    // 30 days
    path: "/"
  });
  return {
    success: true,
    user: {
      id: user._id.toString(),
      email: user.email,
      role: user.role
    }
  };
});
const getUser_createServerFn_handler = createServerRpc({
  id: "30b8c04084b600816842c9f2dc424a3e0fb9aa00e22845df1522902401c83441",
  name: "getUser",
  filename: "src/lib/auth.functions.ts"
}, (opts) => getUser.__executeServer(opts));
const getUser = createServerFn({
  method: "GET"
}).handler(getUser_createServerFn_handler, async () => {
  return await getServerUser();
});
const updateProfile_createServerFn_handler = createServerRpc({
  id: "47ed6ccd67960e36f99bc350e2760485ae0195578547566c0a711d6c57a9621f",
  name: "updateProfile",
  filename: "src/lib/auth.functions.ts"
}, (opts) => updateProfile.__executeServer(opts));
const updateProfile = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  full_name: stringType().optional(),
  phone: stringType().optional(),
  avatar_url: stringType().optional()
}).parse(input)).handler(updateProfile_createServerFn_handler, async ({
  data
}) => {
  try {
    const token = getCookie("auth_token");
    if (!token) throw new Error("Unauthorized");
    const jwt = (await import("../_libs/jsonwebtoken.mjs").then(function(n) {
      return n.i;
    })).default;
    const jwtSecret = process.env.JWT_SECRET || "fallback_secret_please_change_in_production";
    const decoded = jwt.verify(token, jwtSecret);
    await connectDB();
    await User.findByIdAndUpdate(decoded.userId, data);
    return {
      success: true
    };
  } catch (err) {
    throw new Error("Failed to update profile");
  }
});
const logoutUser_createServerFn_handler = createServerRpc({
  id: "6cbb8077119b1c98b1936a362ff0f3a8e6f7c4e845475fee2aa39b9261865a0a",
  name: "logoutUser",
  filename: "src/lib/auth.functions.ts"
}, (opts) => logoutUser.__executeServer(opts));
const logoutUser = createServerFn({
  method: "POST"
}).handler(logoutUser_createServerFn_handler, async () => {
  deleteCookie("auth_token", {
    path: "/"
  });
  return {
    success: true
  };
});
export {
  getUser_createServerFn_handler,
  logoutUser_createServerFn_handler,
  sendOtp_createServerFn_handler,
  updateProfile_createServerFn_handler,
  verifyOtp_createServerFn_handler
};
