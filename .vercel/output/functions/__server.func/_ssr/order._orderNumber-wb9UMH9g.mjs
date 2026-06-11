import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { e as Route$5, u as useAuth, O as ORDER_STATUS_LABELS, f as formatINR } from "./router-unSNHeYa.mjs";
import { a as getOrder } from "./order.functions-DNY5zuD7.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { C as CircleCheck } from "../_libs/lucide-react.mjs";
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
import "./server-CR7JDUVD.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "../_libs/zod.mjs";
const STAGES = ["pending", "packed", "shipped", "out_for_delivery", "delivered"];
function OrderDetailPage() {
  const {
    orderNumber
  } = Route$5.useParams();
  const nav = useNavigate();
  const {
    user,
    loading
  } = useAuth();
  const [order, setOrder] = reactExports.useState(null);
  const [items, setItems] = reactExports.useState([]);
  const [notFound, setNotFound] = reactExports.useState(false);
  const getOrderFn = useServerFn(getOrder);
  reactExports.useEffect(() => {
    if (!loading && !user) nav({
      to: "/login"
    });
  }, [user, loading, nav]);
  reactExports.useEffect(() => {
    if (!user) return;
    getOrderFn({
      data: {
        order_number: orderNumber
      }
    }).then((o) => {
      if (!o) {
        setNotFound(true);
        return;
      }
      setOrder(o);
      setItems(o.items);
    }).catch(() => setNotFound(true));
  }, [user, orderNumber]);
  if (notFound) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md px-5 py-32 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Order not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account/orders", className: "mt-4 inline-block text-sm underline", children: "View my orders" })
    ] });
  }
  if (!order) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-3xl px-5 py-20 text-sm text-muted-foreground", children: "Loading…" });
  const stageIdx = STAGES.indexOf(order.status);
  const placed = new Date(order.createdAt);
  const eta = order.estimated_delivery_date ? new Date(order.estimated_delivery_date) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-5 py-12", children: [
    order.payment_status === "paid" || order.payment_method === "cod" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 border border-accent/30 bg-accent/5 p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-12 text-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Order confirmed" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Thank you! Your order ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
          "#",
          order.order_number
        ] }),
        " has been placed",
        order.payment_method === "cod" ? " — pay on delivery." : " and payment received."
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl", children: [
        "Order #",
        order.order_number
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
        "Payment status: ",
        order.payment_status.replace(/_/g, " ")
      ] })
    ] }),
    order.status !== "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 divide-y divide-border", children: items.map((i, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 py-4", children: [
            i.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: i.image, alt: i.product_name, className: "size-20 object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-20 bg-muted" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: i.product_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: order.shipping_address?.full_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: order.shipping_address?.line1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              order.shipping_address?.city,
              ", ",
              order.shipping_address?.state,
              " ",
              order.shipping_address?.pincode
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
              "Phone: ",
              order.shipping_address?.phone
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-mono", children: order.order_number })
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: order.payment_method === "cod" ? "Cash on Delivery" : "Online" })
            ] }),
            order.razorpay_payment_id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Payment ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-mono text-xs", children: order.razorpay_payment_id })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-between border-t border-border pt-4 text-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(order.total) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account/orders", className: "block border border-border py-3 text-center text-xs uppercase tracking-widest hover:bg-muted", children: "All orders" })
      ] })
    ] })
  ] });
}
export {
  OrderDetailPage as component
};
