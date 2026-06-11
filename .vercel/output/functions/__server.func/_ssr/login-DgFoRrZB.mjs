import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useAuth, s as sendOtp, v as verifyOtp } from "./router-VAEstg49.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-CutrnPlu.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
function LoginPage() {
  const nav = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState("");
  const [stage, setStage] = reactExports.useState("email");
  const [loading, setLoading] = reactExports.useState(false);
  const sendOtpServer = useServerFn(sendOtp);
  const verifyOtpServer = useServerFn(verifyOtp);
  const sendOtp$1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendOtpServer({
        data: {
          email: email.trim().toLowerCase()
        }
      });
      setStage("otp");
      toast.success("OTP sent — check your inbox.");
    } catch (error) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };
  const verify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyOtpServer({
        data: {
          email: email.trim().toLowerCase(),
          otp: otp.trim()
        }
      });
      await auth.refresh();
      toast.success("Signed in.");
      nav({
        to: "/"
      });
    } catch (error) {
      toast.error(error.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md px-5 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Sign in" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Use your email — we'll send you a one-time code." }),
    stage === "email" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: sendOtp$1, className: "mt-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", className: "w-full border border-border bg-background px-4 py-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, className: "w-full bg-foreground py-3 text-sm uppercase tracking-widest text-background disabled:opacity-50", children: loading ? "Sending…" : "Send code" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: verify, className: "mt-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", inputMode: "numeric", required: true, value: otp, onChange: (e) => setOtp(e.target.value), placeholder: "6-digit code", className: "w-full border border-border bg-background px-4 py-3 text-center tracking-[0.5em]", maxLength: 6 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, className: "w-full bg-foreground py-3 text-sm uppercase tracking-widest text-background disabled:opacity-50", children: loading ? "Verifying…" : "Verify & sign in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setStage("email"), className: "w-full text-xs text-muted-foreground", children: "Use a different email" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-sm text-muted-foreground", children: [
      "No account? ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "text-accent", children: "Create one" })
    ] })
  ] });
}
export {
  LoginPage as component
};
