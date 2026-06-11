import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, f as formatINR, O as ORDER_STATUS_LABELS } from "./router-CHbF3jR6.mjs";
import { g as getMyOrders } from "./order.functions-DttxRx8H.mjs";
import { t as toast } from "../_libs/sonner.mjs";
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
import "./server-N1mLFSER.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
const STAGES = ["pending", "packed", "shipped", "out_for_delivery", "delivered"];
function OrdersPage() {
  const nav = useNavigate();
  const {
    user,
    loading
  } = useAuth();
  const [orders, setOrders] = reactExports.useState([]);
  const getOrders = useServerFn(getMyOrders);
  reactExports.useEffect(() => {
    if (!loading && !user) nav({
      to: "/login"
    });
  }, [user, loading, nav]);
  reactExports.useEffect(() => {
    if (!user) return;
    getOrders().then((data) => setOrders(data)).catch((e) => toast.error(e.message || "Failed to load orders"));
  }, [user]);
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl", children: "My orders" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 space-y-6", children: orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded border border-dashed border-border p-12 text-center text-muted-foreground", children: "You haven't placed any orders yet." }) : orders.map((o) => {
      const stageIdx = STAGES.indexOf(o.status);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: [
              "Order #",
              o.order_number
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm", children: new Date(o.createdAt).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: formatINR(o.total) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              o.payment_method === "cod" ? "Cash on Delivery" : "Online",
              " · ",
              o.payment_status.replace(/_/g, " ")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/order/$orderNumber", params: {
              orderNumber: o.order_number
            }, className: "mt-2 inline-block text-xs underline", children: "View details →" })
          ] })
        ] }),
        o.status !== "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: STAGES.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `size-3 rounded-full ${i <= stageIdx ? "bg-accent" : "bg-border"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-[10px] uppercase tracking-widest", children: ORDER_STATUS_LABELS[s] })
          ] }, s)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-px w-full bg-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 divide-y divide-border border-t border-border", children: (o.items ?? []).map((i, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            i.product_name,
            " ",
            i.size && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "· ",
              i.size
            ] }),
            " × ",
            i.quantity
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(i.price * i.quantity) })
        ] }, idx)) }),
        o.tracking_note && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-xs text-muted-foreground", children: [
          "Note: ",
          o.tracking_note
        ] })
      ] }, o.id);
    }) })
  ] });
}
export {
  OrdersPage as component
};
