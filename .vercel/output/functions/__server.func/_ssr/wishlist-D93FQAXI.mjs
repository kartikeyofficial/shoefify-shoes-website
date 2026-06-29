import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, a as useServerFn, g as getWishlistItems, t as toggleWishlistItem, f as formatINR } from "./router-BEmiWmtI.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import "../_libs/seroval.mjs";
import { T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "./server-DRQnurSj.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "../_libs/zod.mjs";
function WishlistPage() {
  const {
    user,
    loading: authLoading
  } = useAuth();
  const nav = useNavigate();
  const getWishlistItemsFn = useServerFn(getWishlistItems);
  const toggleWishlistFn = useServerFn(toggleWishlistItem);
  const queryClient = useQueryClient();
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!authLoading && !user) {
      nav({
        to: "/login"
      });
    }
  }, [user, authLoading, nav]);
  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await getWishlistItemsFn();
      setItems(data);
    } catch (e) {
      toast.error(e.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);
  const handleRemove = async (e, productId) => {
    e.preventDefault();
    try {
      await toggleWishlistFn({
        data: {
          productId
        }
      });
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries({
        queryKey: ["wishlist-count"]
      });
      setItems(items.filter((i) => i.product.id !== productId));
    } catch (e2) {
      toast.error(e2.message || "Failed to remove item");
    }
  };
  if (authLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-5 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-96 animate-pulse bg-secondary" }) });
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl", children: "Your wishlist" }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4", children: Array.from({
      length: 4
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square animate-pulse bg-secondary" }, i)) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 mx-auto max-w-md py-32 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Your wishlist is empty." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "mt-8 inline-flex bg-foreground px-7 py-3 text-sm uppercase tracking-widest text-background", children: "Shop now" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4", children: items.map((i) => {
      const p = i.product;
      if (!p) return null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/product/$slug", params: {
        slug: p.slug
      }, className: "group relative block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-secondary", children: p.images[0] && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.images[0], alt: p.name, className: "size-full object-cover transition-transform duration-500 group-hover:scale-105", loading: "lazy" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => handleRemove(e, p.id), className: "absolute right-3 top-3 rounded-full bg-background/80 p-2 text-muted-foreground backdrop-blur hover:bg-background hover:text-foreground transition-all", "aria-label": "Remove from wishlist", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          p.brand && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: p.brand }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(p.price) }),
            p.compare_at_price && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground line-through", children: formatINR(p.compare_at_price) })
          ] })
        ] })
      ] }, i.id);
    }) })
  ] });
}
export {
  WishlistPage as component
};
