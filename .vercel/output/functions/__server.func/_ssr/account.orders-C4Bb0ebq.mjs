import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, a as useServerFn, O as ORDER_STATUS_LABELS, f as formatINR } from "./router-BEmiWmtI.mjs";
import { g as getMyOrders } from "./order.functions-DOOeHPWg.mjs";
import { t as toast } from "../_libs/sonner.mjs";
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
import "./server-DRQnurSj.mjs";
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
      const placed = new Date(o.createdAt);
      const eta = o.estimated_delivery_date ? new Date(o.estimated_delivery_date) : null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-6 lg:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl", children: [
              "Order #",
              o.order_number
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
              "Payment status: ",
              o.payment_status.replace(/_/g, " ")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/order/$orderNumber", params: {
            orderNumber: o.order_number
          }, className: "border border-border px-4 py-2 text-xs uppercase tracking-widest hover:bg-muted", children: "View details" })
        ] }),
        o.status !== "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Tracking" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 top-3 h-0.5 bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-3 h-0.5 bg-green-600 transition-all", style: {
              width: `${stageIdx / (STAGES.length - 1) * 100}%`
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex items-start justify-between", children: STAGES.map((s, i) => {
              const done = i <= stageIdx;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `relative z-10 size-6 rounded-full border-2 ${done ? "border-green-600 bg-green-600" : "border-border bg-background"} flex items-center justify-center`, children: done && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-2 rounded-full bg-white" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-2 text-center text-[10px] uppercase tracking-widest ${done ? "text-foreground" : "text-muted-foreground"}`, children: ORDER_STATUS_LABELS[s] })
              ] }, s);
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-8 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Items" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 divide-y divide-border", children: (o.items ?? []).map((i, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 py-4", children: [
                i.product_slug ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$slug", params: {
                  slug: i.product_slug
                }, className: "shrink-0 block", children: i.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: i.image, alt: i.product_name, className: "size-20 object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-20 bg-muted" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: i.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: i.image, alt: i.product_name, className: "size-20 object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-20 bg-muted" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  i.product_slug ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$slug", params: {
                    slug: i.product_slug
                  }, className: "font-medium hover:underline block", children: i.product_name }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: i.product_name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
                    i.size && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      "Size ",
                      i.size,
                      " · "
                    ] }),
                    "Qty ",
                    i.quantity
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: formatINR(i.price * i.quantity) })
              ] }, idx)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Shipping to" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-sm leading-relaxed", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: o.shipping_address?.full_name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: o.shipping_address?.line1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  o.shipping_address?.city,
                  ", ",
                  o.shipping_address?.state,
                  " ",
                  o.shipping_address?.pincode
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
                  "Phone: ",
                  o.shipping_address?.phone
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-fit space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Order summary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-4 space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Order #" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-mono", children: o.order_number })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Placed" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: placed.toLocaleString() })
                ] }),
                eta && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Estimated arrival" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: eta.toLocaleDateString(void 0, {
                    weekday: "short",
                    day: "numeric",
                    month: "short"
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Payment" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: o.payment_method === "cod" ? "Cash on Delivery" : "Online" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-between border-t border-border pt-4 text-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(o.total) })
              ] })
            ] }),
            o.tracking_note && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "Note: ",
              o.tracking_note
            ] })
          ] })
        ] })
      ] }, o.id);
    }) })
  ] });
}
export {
  OrdersPage as component
};
