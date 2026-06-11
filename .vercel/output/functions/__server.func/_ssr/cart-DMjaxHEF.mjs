import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useCart, f as formatINR } from "./router-VAEstg49.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { a as Minus, P as Plus, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/zod.mjs";
function CartPage() {
  const {
    items,
    setQty,
    remove,
    total
  } = useCart();
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md px-5 py-32 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Your bag is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Find your next favorite pair." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-8 inline-flex bg-foreground px-7 py-3 text-sm uppercase tracking-widest text-background", children: "Shop now" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl", children: "Your bag" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-10 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 lg:col-span-2", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 border-b border-border pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$slug", params: {
          slug: i.slug
        }, className: "size-28 shrink-0 overflow-hidden bg-secondary", children: i.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: i.image, alt: i.name, className: "size-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: i.name }),
            i.size && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "Size ",
              i.size
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm", children: formatINR(i.price) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(i.productId, i.variantId, i.qty - 1), className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "size-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center text-sm", children: i.qty }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(i.productId, i.variantId, i.qty + 1), className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-3" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(i.productId, i.variantId), className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
          ] })
        ] })
      ] }, `${i.productId}-${i.variantId}`)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-fit border border-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest", children: "Order summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(total()) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex justify-between text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Free" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-between border-t border-border pt-4 text-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(total()) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", className: "mt-6 block bg-foreground py-3 text-center text-sm uppercase tracking-widest text-background", children: "Checkout" })
      ] })
    ] })
  ] });
}
export {
  CartPage as component
};
