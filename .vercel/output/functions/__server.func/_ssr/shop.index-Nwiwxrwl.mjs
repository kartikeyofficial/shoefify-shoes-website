import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { f as formatINR } from "./router-unSNHeYa.mjs";
import { g as getPublicProducts } from "./product.functions-DAsiWJ7Q.mjs";
import { g as getCategories } from "./category.functions-D-GSwVZD.mjs";
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
import "./server-CR7JDUVD.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
function ShopAll() {
  const [products, setProducts] = reactExports.useState([]);
  const [cats, setCats] = reactExports.useState([]);
  const [activeCat, setActiveCat] = reactExports.useState(null);
  const [sort, setSort] = reactExports.useState("new");
  const [loading, setLoading] = reactExports.useState(true);
  const getCategoriesFn = useServerFn(getCategories);
  const getPublicProductsFn = useServerFn(getPublicProducts);
  reactExports.useEffect(() => {
    getCategoriesFn().then((data) => setCats(data)).catch((e) => toast.error(e.message || "Failed to load categories"));
  }, []);
  reactExports.useEffect(() => {
    setLoading(true);
    getPublicProductsFn({
      data: {
        categoryId: activeCat,
        sort
      }
    }).then((data) => setProducts(data)).catch((e) => toast.error(e.message || "Failed to load products")).finally(() => setLoading(false));
  }, [activeCat, sort]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl", children: "Shop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          products.length,
          " products"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sort, onChange: (e) => setSort(e.target.value), className: "border border-border bg-background px-3 py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new", children: "Newest" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price_asc", children: "Price: low to high" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price_desc", children: "Price: high to low" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveCat(null), className: `border px-4 py-1.5 text-xs uppercase tracking-widest ${!activeCat ? "border-foreground bg-foreground text-background" : "border-border"}`, children: "All" }),
      cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveCat(c.id), className: `border px-4 py-1.5 text-xs uppercase tracking-widest ${activeCat === c.id ? "border-foreground bg-foreground text-background" : "border-border"}`, children: c.name }, c.id))
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4", children: Array.from({
      length: 8
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square animate-pulse bg-secondary" }, i)) }) : products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded border border-dashed border-border p-16 text-center text-muted-foreground", children: "No products yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/product/$slug", params: {
      slug: p.slug
    }, className: "group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-secondary", children: p.images[0] && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.images[0], alt: p.name, className: "size-full object-cover transition-transform duration-500 group-hover:scale-105", loading: "lazy" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
        p.brand && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: p.brand }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(p.price) }),
          p.compare_at_price && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground line-through", children: formatINR(p.compare_at_price) })
        ] })
      ] })
    ] }, p.id)) })
  ] });
}
export {
  ShopAll as component
};
