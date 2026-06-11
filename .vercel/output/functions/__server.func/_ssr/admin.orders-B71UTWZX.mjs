import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { O as ORDER_STATUS_LABELS, f as formatINR } from "./router-unSNHeYa.mjs";
import { b as getAdminOrders, u as updateOrderStatus } from "./order.functions-DNY5zuD7.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
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
const STATUSES = ["pending", "packed", "shipped", "out_for_delivery", "delivered", "cancelled"];
const PAY_STATUSES = ["pending", "paid", "failed", "refunded", "cod_pending", "awaiting_manual_verification"];
function AdminOrders() {
  const [orders, setOrders] = reactExports.useState([]);
  const [open, setOpen] = reactExports.useState(null);
  const [filter, setFilter] = reactExports.useState("all");
  const getAdminOrdersFn = useServerFn(getAdminOrders);
  const updateOrderStatusFn = useServerFn(updateOrderStatus);
  const load = async () => {
    try {
      const data = await getAdminOrdersFn();
      setOrders(data);
    } catch (e) {
      toast.error(e.message || "Failed to load orders");
    }
  };
  reactExports.useEffect(() => {
    load();
  }, []);
  const update = async (id, patch) => {
    try {
      await updateOrderStatusFn({
        data: {
          id,
          ...patch
        }
      });
      toast.success("Updated.");
      load();
    } catch (e) {
      toast.error(e.message || "Update failed");
    }
  };
  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl", children: [
        "Orders (",
        orders.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "border border-border bg-background px-3 py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All" }),
        STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: ORDER_STATUS_LABELS[s] || s }, s))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      filtered.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(open === o.id ? null : o.id), className: "flex w-full items-center justify-between p-4 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
              "#",
              o.order_number
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              new Date(o.createdAt).toLocaleString(),
              " · ",
              o.shipping_address?.full_name
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest", children: ORDER_STATUS_LABELS[o.status] || o.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(o.total) })
          ] })
        ] }),
        open === o.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Items" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 divide-y divide-border", children: (o.items ?? []).map((i, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 py-2 text-sm", children: [
                i.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: i.image, alt: i.product_name, className: "size-10 object-cover bg-muted" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 bg-muted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    i.product_name,
                    " ",
                    i.size && `· ${i.size}`
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                    "Qty ",
                    i.quantity
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: formatINR(i.price * i.quantity) })
              ] }, idx)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Shipping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-sm", children: [
                o.shipping_address?.full_name,
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                o.shipping_address?.phone,
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                o.shipping_address?.line1,
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                o.shipping_address?.city,
                ", ",
                o.shipping_address?.state,
                " ",
                o.shipping_address?.pincode
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-xs text-muted-foreground", children: [
                "Payment: ",
                o.payment_method.toUpperCase(),
                " · ",
                o.payment_status
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 border-t border-border pt-4 md:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block uppercase tracking-widest text-muted-foreground", children: "Order status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: o.status, onChange: (e) => update(o.id, {
                status: e.target.value
              }), className: "mt-1 w-full border border-border bg-background px-2 py-2 text-sm", children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: ORDER_STATUS_LABELS[s] || s }, s)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block uppercase tracking-widest text-muted-foreground", children: "Payment status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: o.payment_status, onChange: (e) => update(o.id, {
                payment_status: e.target.value
              }), className: "mt-1 w-full border border-border bg-background px-2 py-2 text-sm", children: PAY_STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block uppercase tracking-widest text-muted-foreground", children: "Tracking note" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: o.tracking_note ?? "", onBlur: (e) => e.target.value !== (o.tracking_note ?? "") && update(o.id, {
                tracking_note: e.target.value
              }), className: "mt-1 w-full border border-border bg-background px-2 py-2 text-sm" })
            ] })
          ] })
        ] })
      ] }, o.id)),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded border border-dashed border-border p-12 text-center text-muted-foreground", children: "No orders." })
    ] })
  ] });
}
export {
  AdminOrders as component
};
