import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as getMessages, u as updateMessage } from "./message.functions-DkBpeoBX.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "./router-unSNHeYa.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "./server-CR7JDUVD.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
const STATUSES = ["new", "in_review", "resolved"];
function AdminMessages() {
  const [msgs, setMsgs] = reactExports.useState([]);
  const [open, setOpen] = reactExports.useState(null);
  const getMessagesFn = useServerFn(getMessages);
  const updateMessageFn = useServerFn(updateMessage);
  const load = () => getMessagesFn().then((data) => setMsgs(data)).catch((e) => toast.error(e.message || "Failed to load messages"));
  reactExports.useEffect(() => {
    load();
  }, []);
  const update = async (id, patch) => {
    try {
      await updateMessageFn({
        data: {
          id,
          ...patch
        }
      });
      load();
    } catch (e) {
      toast.error(e.message || "Failed to update message");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl", children: [
      "Messages (",
      msgs.length,
      ")"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2", children: [
      msgs.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(open === m.id ? null : m.id), className: "flex w-full items-center justify-between p-4 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-accent", children: [
            m.type,
            " · ",
            m.status
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-medium", children: m.subject }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            m.name,
            " · ",
            m.email,
            " · ",
            new Date(m.createdAt).toLocaleString()
          ] })
        ] }) }),
        open === m.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm whitespace-pre-wrap", children: m.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex gap-2", children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => update(m.id, {
            status: s
          }), className: `border px-3 py-1 text-xs uppercase tracking-widest ${m.status === s ? "border-foreground bg-foreground text-background" : "border-border"}`, children: s }, s)) })
        ] })
      ] }, m.id)),
      msgs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded border border-dashed border-border p-12 text-center text-muted-foreground", children: "No messages yet." })
    ] })
  ] });
}
export {
  AdminMessages as component
};
