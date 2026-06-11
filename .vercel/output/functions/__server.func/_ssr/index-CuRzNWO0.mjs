import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { f as formatINR } from "./router-CHbF3jR6.mjs";
import { g as getPublicProducts } from "./product.functions-BBbgHlCJ.mjs";
import { g as getCategories } from "./category.functions-BjB2f4Hw.mjs";
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
import "./server-N1mLFSER.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
const hero1 = "/assets/hero-1-kiQoe2xz.jpg";
const hero2 = "/assets/hero-2-CKImwm7f.jpg";
const hero3 = "/assets/hero-3-DXgduaKA.jpg";
const slides = [{
  img: hero1,
  eyebrow: "New season",
  title: "Walk into\nthe warm light.",
  sub: "Crafted leather sneakers, made for everyday."
}, {
  img: hero2,
  eyebrow: "Formal",
  title: "Quiet luxury,\nstep by step.",
  sub: "Hand-finished loafers in rich burnished tones."
}, {
  img: hero3,
  eyebrow: "Sport",
  title: "Built for\nthe long mile.",
  sub: "Engineered runners with all-day cushion."
}];
function Home() {
  const [idx, setIdx] = reactExports.useState(0);
  const [products, setProducts] = reactExports.useState([]);
  const [cats, setCats] = reactExports.useState([]);
  const getPublicProductsFn = useServerFn(getPublicProducts);
  const getCategoriesFn = useServerFn(getCategories);
  reactExports.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);
  reactExports.useEffect(() => {
    getPublicProductsFn({
      data: {}
    }).then((data) => {
      const featured = data.filter((p) => p.is_featured).slice(0, 8);
      setProducts(featured);
    });
    getCategoriesFn().then((data) => setCats(data));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative h-[78vh] min-h-[520px] w-full overflow-hidden bg-secondary", children: [
      slides.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `absolute inset-0 transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.img, alt: "", className: "size-full object-cover", width: 1920, height: 1280 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mx-auto flex h-full max-w-7xl items-end px-5 pb-20 md:items-center md:pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.25em] text-accent", children: s.eyebrow }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 whitespace-pre-line font-display text-5xl leading-[1.05] md:text-7xl", children: s.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-md text-base text-muted-foreground", children: s.sub }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-8 inline-flex items-center rounded-none border border-foreground bg-foreground px-7 py-3 text-sm uppercase tracking-widest text-background hover:bg-transparent hover:text-foreground", children: "Shop the collection" })
        ] }) })
      ] }, i)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2", children: slides.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIdx(i), "aria-label": `slide ${i + 1}`, className: `h-1 transition-all ${i === idx ? "w-8 bg-foreground" : "w-4 bg-foreground/30"}` }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-5 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl", children: "Shop by category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "text-sm uppercase tracking-widest text-accent", children: "View all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6", children: cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: {
        category: c.slug
      }, className: "group aspect-square overflow-hidden bg-secondary p-6 transition-colors hover:bg-accent hover:text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground/80", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl", children: c.name })
      ] }) }, c.slug)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-5 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl", children: "Featured" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "text-sm uppercase tracking-widest text-accent", children: "All products" })
      ] }),
      products.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded border border-dashed border-border p-12 text-center text-muted-foreground", children: "No featured products yet. The admin can add them from the dashboard." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4", children: products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/product/$slug", params: {
        slug: p.slug
      }, className: "group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-secondary", children: p.images[0] && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.images[0], alt: p.name, className: "size-full object-cover transition-transform duration-500 group-hover:scale-105", loading: "lazy" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          p.brand && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: p.brand }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm", children: formatINR(p.price) })
        ] })
      ] }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-16 bg-foreground py-24 text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.25em] text-accent", children: "Our promise" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 font-display text-4xl md:text-5xl", children: [
        "Made to last.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Made to be worn."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-background/70", children: "Every Shoefify pair is built from materials we'd stand behind ourselves — supple leather, breathable knits, soles tuned for Indian streets. Free shipping pan-India. Easy 7-day returns." })
    ] }) })
  ] });
}
export {
  Home as component
};
