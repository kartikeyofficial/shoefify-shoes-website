import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAuth, S as SITE } from "./router-unSNHeYa.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as createMessage } from "./message.functions-DkBpeoBX.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./server-CR7JDUVD.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
const FAQ = [{
  q: "How long does shipping take?",
  a: "Orders ship within 1-2 business days and arrive in 3-7 days across India."
}, {
  q: "What is the return policy?",
  a: "Easy 7-day returns on unworn items in original packaging."
}, {
  q: "Which payment methods are accepted?",
  a: "UPI, cards, netbanking via Razorpay, plus Cash on Delivery."
}, {
  q: "How do I track my order?",
  a: "Sign in and visit My Orders to see live status."
}];
function HelpPage() {
  const {
    user
  } = useAuth();
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "question"
  });
  const [sending, setSending] = reactExports.useState(false);
  const createMessageFn = useServerFn(createMessage);
  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await createMessageFn({
        data: form
      });
      toast.success("Thanks — we'll get back to you soon.");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        type: "question"
      });
    } catch (error) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl", children: "Help & feedback" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-muted-foreground", children: [
      "Questions, suggestions or issues — we'd love to hear from you. Or email ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${SITE.email}`, className: "text-accent", children: SITE.email }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl", children: "FAQs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 divide-y divide-border border-y border-border", children: FAQ.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "group py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer list-none font-medium", children: f.q }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: f.a })
      ] }, f.q)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl", children: "Get in touch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-6 grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, placeholder: "Your name", value: form.name, onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }), className: "border border-border bg-background px-4 py-3 text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", placeholder: "Your email", value: form.email, onChange: (e) => setForm({
          ...form,
          email: e.target.value
        }), className: "border border-border bg-background px-4 py-3 text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.type, onChange: (e) => setForm({
          ...form,
          type: e.target.value
        }), className: "col-span-2 border border-border bg-background px-4 py-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "question", children: "Question" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "suggestion", children: "Suggestion" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "report", children: "Report a problem" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, placeholder: "Subject", value: form.subject, onChange: (e) => setForm({
          ...form,
          subject: e.target.value
        }), className: "col-span-2 border border-border bg-background px-4 py-3 text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, rows: 6, placeholder: "Your message…", value: form.message, onChange: (e) => setForm({
          ...form,
          message: e.target.value
        }), className: "col-span-2 border border-border bg-background px-4 py-3 text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: sending, className: "col-span-2 bg-foreground py-3 text-sm uppercase tracking-widest text-background disabled:opacity-50", children: sending ? "Sending…" : "Send message" })
      ] })
    ] })
  ] });
}
export {
  HelpPage as component
};
