import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { a as getProductBySlug } from "./product.functions-FTcLUJf7.mjs";
import { e as Route$6, b as useCart, a as useServerFn, t as toggleWishlistItem, u as useAuth, f as formatINR } from "./router-BEmiWmtI.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import "../_libs/seroval.mjs";
import { H as Heart } from "../_libs/lucide-react.mjs";
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
import "./server-DRQnurSj.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/zustand.mjs";
function ProductPage() {
  const {
    slug
  } = Route$6.useParams();
  const nav = useNavigate();
  const add = useCart((s) => s.add);
  const [product, setProduct] = reactExports.useState(null);
  const [variants, setVariants] = reactExports.useState([]);
  const [size, setSize] = reactExports.useState(null);
  const [imgIdx, setImgIdx] = reactExports.useState(0);
  const [loading, setLoading] = reactExports.useState(true);
  const getProductBySlugFn = useServerFn(getProductBySlug);
  const toggleWishlistFn = useServerFn(toggleWishlistItem);
  const {
    user
  } = useAuth();
  const queryClient = useQueryClient();
  reactExports.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const p = await getProductBySlugFn({
          data: {
            slug
          }
        });
        if (p) {
          setProduct(p);
          setVariants(p.variants?.map((v) => ({
            ...v,
            id: v._id
          })) ?? []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-5 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-96 animate-pulse bg-secondary" }) });
  if (!product) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-md px-5 py-32 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Product not found" }) });
  const handleAdd = () => {
    if (variants.length > 0 && !size) return toast.error("Please pick a size.");
    add({
      productId: product.id,
      variantId: size?.id ?? null,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "",
      size: size?.size ?? null,
      qty: 1,
      slug: product.slug
    });
    toast.success("Added to bag.");
  };
  const buyNow = () => {
    handleAdd();
    nav({
      to: "/checkout"
    });
  };
  const handleWishlist = async () => {
    if (!product) return;
    if (!user) {
      toast.error("Please login to use the wishlist");
      nav({
        to: "/login"
      });
      return;
    }
    try {
      const res = await toggleWishlistFn({
        data: {
          productId: product.id
        }
      });
      if (res.added) toast.success("Added to wishlist");
      else toast.success("Removed from wishlist");
      queryClient.invalidateQueries({
        queryKey: ["wishlist-count"]
      });
    } catch (e) {
      toast.error(e.message || "Failed to update wishlist");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-5 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-secondary", children: product.images[imgIdx] && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.images[imgIdx], alt: product.name, className: "size-full object-cover" }) }),
      product.images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-5 gap-2", children: product.images.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setImgIdx(i), className: `aspect-square overflow-hidden bg-secondary ${i === imgIdx ? "ring-2 ring-foreground" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", className: "size-full object-cover" }) }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      product.brand && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: product.brand }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl", children: product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-baseline gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: formatINR(product.price) }),
        product.compare_at_price && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground line-through", children: formatINR(product.compare_at_price) })
      ] }),
      product.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm leading-relaxed text-muted-foreground", children: product.description }),
      variants.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest", children: "Select size" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-5 gap-2", children: variants.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: v.stock <= 0, onClick: () => setSize(v), className: `border py-3 text-sm ${size?.id === v.id ? "border-foreground bg-foreground text-background" : "border-border"} ${v.stock <= 0 ? "line-through opacity-40" : ""}`, children: v.size }, v.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: buyNow, className: "bg-foreground py-4 text-sm uppercase tracking-widest text-background", children: "Buy now" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleAdd, className: "flex-1 border border-foreground py-4 text-sm uppercase tracking-widest", children: "Add to bag" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleWishlist, className: "flex-none border border-border p-4 hover:border-foreground transition-colors", "aria-label": "Toggle wishlist", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "size-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 border-t border-border pt-6 text-xs text-muted-foreground", children: "Free shipping across India · 7-day easy returns" })
    ] })
  ] }) });
}
export {
  ProductPage as component
};
