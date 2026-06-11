import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route$7, f as formatINR } from "./router-unSNHeYa.mjs";
import { g as getCategories } from "./category.functions-D-GSwVZD.mjs";
import { g as getPublicProducts } from "./product.functions-DAsiWJ7Q.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import "../_libs/sonner.mjs";
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
function ShopCategory() {
  const {
    category
  } = Route$7.useParams();
  const [products, setProducts] = reactExports.useState([]);
  const [catName, setCatName] = reactExports.useState(category);
  const [loading, setLoading] = reactExports.useState(true);
  const getCategoriesFn = useServerFn(getCategories);
  const getPublicProductsFn = useServerFn(getPublicProducts);
  reactExports.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const cats = await getCategoriesFn();
        const cat = cats.find((c) => c.slug === category);
        if (!cat) {
          setProducts([]);
          setLoading(false);
          return;
        }
        setCatName(cat.name);
        const data = await getPublicProductsFn({
          data: {
            categoryId: cat.id
          }
        });
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: "Shop" }),
      " / ",
      catName
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-5xl capitalize", children: catName }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
      products.length,
      " products"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4", children: Array.from({
      length: 8
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square animate-pulse bg-secondary" }, i)) }) : products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded border border-dashed border-border p-16 text-center text-muted-foreground", children: "No products in this category yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/product/$slug", params: {
      slug: p.slug
    }, className: "group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-secondary", children: p.images[0] && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.images[0], alt: p.name, className: "size-full object-cover transition-transform duration-500 group-hover:scale-105", loading: "lazy" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
        p.brand && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: p.brand }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm", children: formatINR(p.price) })
      ] })
    ] }, p.id)) }) })
  ] });
}
export {
  ShopCategory as component
};
