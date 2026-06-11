import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, L as Link } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-N1mLFSER.mjs";
import { c as create, p as persist } from "../_libs/zustand.mjs";
import { L as LayoutGrid, U as User, S as ShoppingBag, X, M as Menu } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const sendOtp = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  email: stringType().email()
}).parse(input)).handler(createSsrRpc("3d5e698f221dd29c57219887dc5962cf2d5363d4eb2f301862ec416ee612548b"));
const verifyOtp = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  email: stringType().email(),
  otp: stringType().length(6)
}).parse(input)).handler(createSsrRpc("9a8e9c246ad5eb913400de7bc2aa33f95e62ce293d5c7fcf0d4a8f2148dd7943"));
const getUser = createServerFn({
  method: "GET"
}).handler(createSsrRpc("30b8c04084b600816842c9f2dc424a3e0fb9aa00e22845df1522902401c83441"));
const updateProfile = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  full_name: stringType().optional(),
  phone: stringType().optional(),
  avatar_url: stringType().optional()
}).parse(input)).handler(createSsrRpc("47ed6ccd67960e36f99bc350e2760485ae0195578547566c0a711d6c57a9621f"));
const logoutUser = createServerFn({
  method: "POST"
}).handler(createSsrRpc("6cbb8077119b1c98b1936a362ff0f3a8e6f7c4e845475fee2aa39b9261865a0a"));
const Ctx = reactExports.createContext({
  user: null,
  isAdmin: false,
  loading: true,
  signOut: async () => {
  },
  refresh: async () => {
  }
});
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const refresh = async () => {
    try {
      const data = await getUser();
      if (data) {
        setUser(data);
        setIsAdmin(data.role === "admin");
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    } catch (e) {
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    refresh();
  }, []);
  const signOut = async () => {
    await logoutUser();
    setUser(null);
    setIsAdmin(false);
    window.location.href = "/login";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx.Provider, { value: { user, isAdmin, loading, signOut, refresh }, children });
}
const useAuth = () => reactExports.useContext(Ctx);
const useCart = create()(
  persist(
    (set, get) => ({
      items: [],
      add: (line) => set((s) => {
        const idx = s.items.findIndex(
          (i) => i.productId === line.productId && i.variantId === line.variantId
        );
        if (idx >= 0) {
          const items = [...s.items];
          items[idx] = { ...items[idx], qty: items[idx].qty + line.qty };
          return { items };
        }
        return { items: [...s.items, line] };
      }),
      remove: (pid, vid) => set((s) => ({ items: s.items.filter((i) => !(i.productId === pid && i.variantId === vid)) })),
      setQty: (pid, vid, qty) => set((s) => ({
        items: s.items.map(
          (i) => i.productId === pid && i.variantId === vid ? { ...i, qty: Math.max(1, qty) } : i
        )
      })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
      count: () => get().items.reduce((s, i) => s + i.qty, 0)
    }),
    { name: "shoefify-cart" }
  )
);
const formatINR = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const SITE = {
  name: "Shoefify",
  domain: "shoefify.shop",
  email: "shoefify.shop@gmail.com",
  tagline: "Footwear, considered."
};
const ORDER_STATUS_LABELS = {
  pending: "Confirmed",
  packed: "Packed",
  shipped: "Shipped",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled"
};
function SiteHeader() {
  const { user, isAdmin } = useAuth();
  const count = useCart((s) => s.count());
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "font-display text-2xl tracking-tight", children: [
        SITE.name,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-8 md:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "text-sm hover:text-accent", children: "Shop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "men" }, className: "text-sm hover:text-accent", children: "Men" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "women" }, className: "text-sm hover:text-accent", children: "Women" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "sneakers" }, className: "text-sm hover:text-accent", children: "Sneakers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "formal" }, className: "text-sm hover:text-accent", children: "Formal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "sports" }, className: "text-sm hover:text-accent", children: "Sports" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "kid" }, className: "text-sm hover:text-accent", children: "Kids" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "text-sm hover:text-accent", children: "About" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/help", className: "text-sm hover:text-accent", children: "Help" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "inline-flex items-center gap-1 rounded border border-border px-2 py-1.5 text-xs uppercase tracking-wide hover:bg-secondary md:px-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "size-3.5" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Admin" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: user ? "/account" : "/login", className: "rounded-full p-2 hover:bg-secondary", "aria-label": "account", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cart", className: "relative rounded-full p-2 hover:bg-secondary", "aria-label": "cart", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-5" }),
          count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground", children: count })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-full p-2 md:hidden", onClick: () => setOpen(!open), "aria-label": "menu", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" }) })
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", onClick: () => setOpen(false), className: "py-2 text-sm", children: "Shop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "men" }, onClick: () => setOpen(false), className: "py-2 text-sm", children: "Men" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "women" }, onClick: () => setOpen(false), className: "py-2 text-sm", children: "Women" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "sneakers" }, onClick: () => setOpen(false), className: "py-2 text-sm", children: "Sneakers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "formal" }, onClick: () => setOpen(false), className: "py-2 text-sm", children: "Formal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "sports" }, onClick: () => setOpen(false), className: "py-2 text-sm", children: "Sports" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "kid" }, onClick: () => setOpen(false), className: "py-2 text-sm", children: "Kids" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", onClick: () => setOpen(false), className: "py-2 text-sm", children: "About" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/help", onClick: () => setOpen(false), className: "py-2 text-sm", children: "Help" }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", onClick: () => setOpen(false), className: "py-2 text-sm text-accent", children: "Admin" })
    ] }) })
  ] });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-24 border-t border-border bg-secondary/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl", children: [
          SITE.name,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: SITE.tagline })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-widest", children: "Shop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "men" }, children: "Men" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "women" }, children: "Women" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "sneakers" }, children: "Sneakers" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop/$category", params: { category: "formal" }, children: "Formal" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-widest", children: "Company" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", children: "About" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Contact" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/help", children: "Help & Feedback" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-widest", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${SITE.email}`, className: "hover:text-foreground", children: SITE.email }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: SITE.domain })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 py-5 text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ",
      SITE.name,
      ". All rights reserved."
    ] }) })
  ] });
}
const appCss = "/assets/styles-C7a3zzbV.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "This page doesn't exist or has moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "mt-6 inline-flex rounded border border-foreground px-5 py-2 text-sm uppercase tracking-wide", children: "Go home" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
      router2.invalidate();
      reset();
    }, className: "mt-6 rounded border border-foreground px-5 py-2 text-sm uppercase tracking-wide", children: "Try again" })
  ] }) });
}
const Route$k = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Shoefify — Footwear, considered." },
      { name: "description", content: "Premium shoes for men, women & kids. Sneakers, formal, sports. Shop at Shoefify." },
      { property: "og:title", content: "Shoefify — Footwear, considered." },
      { property: "og:description", content: "Premium shoes for men, women & kids. Sneakers, formal, sports. Shop at Shoefify." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Shoefify — Footwear, considered." },
      { name: "twitter:description", content: "Premium shoes for men, women & kids. Sneakers, formal, sports. Shop at Shoefify." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0658cee5-dc3f-4e15-a473-5ff7ec9f0ce2/id-preview-5fe77d2c--838f4050-413a-4f33-a06a-82d9206c91e4.lovable.app-1780305574786.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0658cee5-dc3f-4e15-a473-5ff7ec9f0ce2/id-preview-5fe77d2c--838f4050-413a-4f33-a06a-82d9206c91e4.lovable.app-1780305574786.png" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$k.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-center" })
  ] }) });
}
const $$splitComponentImporter$j = () => import("./signup-DGkYd63B.mjs");
const Route$j = createFileRoute("/signup")({
  head: () => ({
    meta: [{
      title: "Create account — Shoefify"
    }, {
      name: "description",
      content: "Create your Shoefify account with email OTP."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./login-CnnrDzWP.mjs");
const Route$i = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign in — Shoefify"
    }, {
      name: "description",
      content: "Sign in to Shoefify with email OTP."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./help-oCyBh9Is.mjs");
const Route$h = createFileRoute("/help")({
  head: () => ({
    meta: [{
      title: "Help & feedback — Shoefify"
    }, {
      name: "description",
      content: "FAQs, suggestions, and support — get in touch with Shoefify."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./contact-DWXnqZId.mjs");
const Route$g = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — Shoefify"
    }, {
      name: "description",
      content: "Get in touch with the Shoefify team."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./checkout-CgPJTU3O.mjs");
const Route$f = createFileRoute("/checkout")({
  head: () => ({
    meta: [{
      title: "Checkout — Shoefify"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./cart-B7900oK1.mjs");
const Route$e = createFileRoute("/cart")({
  head: () => ({
    meta: [{
      title: "Your bag — Shoefify"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./admin-C3I6Uk0m.mjs");
const Route$d = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin — Shoefify"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./account-y9PqmRvu.mjs");
const Route$c = createFileRoute("/account")({
  head: () => ({
    meta: [{
      title: "My account — Shoefify"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./about-B-JnN7gK.mjs");
const Route$b = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — Shoefify"
    }, {
      name: "description",
      content: "Shoefify is a considered footwear label. Made to last, made to be worn."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./index-CuRzNWO0.mjs");
const Route$a = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Shoefify — Footwear, considered."
    }, {
      name: "description",
      content: "Premium shoes for men, women & kids. Sneakers, formal, sports. Shop the latest at Shoefify."
    }, {
      property: "og:title",
      content: "Shoefify — Footwear, considered."
    }, {
      property: "og:description",
      content: "Premium shoes for men, women & kids."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./shop.index-D9was3qS.mjs");
const Route$9 = createFileRoute("/shop/")({
  head: () => ({
    meta: [{
      title: "Shop all shoes — Shoefify"
    }, {
      name: "description",
      content: "Browse all shoes — sneakers, formal, sports, and more."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./admin.index-D8Nz5v1h.mjs");
const Route$8 = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./shop._category-1trnUh1d.mjs");
const Route$7 = createFileRoute("/shop/$category")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `${params.category} shoes — Shoefify`
    }, {
      name: "description",
      content: `Shop ${params.category} shoes at Shoefify.`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./product._slug-DdZuXEMM.mjs");
const Route$6 = createFileRoute("/product/$slug")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `${params.slug} — Shoefify`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./order._orderNumber-DdYHNx4F.mjs");
const Route$5 = createFileRoute("/order/$orderNumber")({
  head: () => ({
    meta: [{
      title: "Order details — Shoefify"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.products-B2Cr2QIx.mjs");
const Route$4 = createFileRoute("/admin/products")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.orders-BgABwzxr.mjs");
const Route$3 = createFileRoute("/admin/orders")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.messages-DwLF60v1.mjs");
const Route$2 = createFileRoute("/admin/messages")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.categories-Djiv_okr.mjs");
const Route$1 = createFileRoute("/admin/categories")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./account.orders-BVjjshR5.mjs");
const Route = createFileRoute("/account/orders")({
  head: () => ({
    meta: [{
      title: "My orders — Shoefify"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SignupRoute = Route$j.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$k
});
const LoginRoute = Route$i.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$k
});
const HelpRoute = Route$h.update({
  id: "/help",
  path: "/help",
  getParentRoute: () => Route$k
});
const ContactRoute = Route$g.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$k
});
const CheckoutRoute = Route$f.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$k
});
const CartRoute = Route$e.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$k
});
const AdminRoute = Route$d.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$k
});
const AccountRoute = Route$c.update({
  id: "/account",
  path: "/account",
  getParentRoute: () => Route$k
});
const AboutRoute = Route$b.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$k
});
const IndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$k
});
const ShopIndexRoute = Route$9.update({
  id: "/shop/",
  path: "/shop/",
  getParentRoute: () => Route$k
});
const AdminIndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const ShopCategoryRoute = Route$7.update({
  id: "/shop/$category",
  path: "/shop/$category",
  getParentRoute: () => Route$k
});
const ProductSlugRoute = Route$6.update({
  id: "/product/$slug",
  path: "/product/$slug",
  getParentRoute: () => Route$k
});
const OrderOrderNumberRoute = Route$5.update({
  id: "/order/$orderNumber",
  path: "/order/$orderNumber",
  getParentRoute: () => Route$k
});
const AdminProductsRoute = Route$4.update({
  id: "/products",
  path: "/products",
  getParentRoute: () => AdminRoute
});
const AdminOrdersRoute = Route$3.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => AdminRoute
});
const AdminMessagesRoute = Route$2.update({
  id: "/messages",
  path: "/messages",
  getParentRoute: () => AdminRoute
});
const AdminCategoriesRoute = Route$1.update({
  id: "/categories",
  path: "/categories",
  getParentRoute: () => AdminRoute
});
const AccountOrdersRoute = Route.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => AccountRoute
});
const AccountRouteChildren = {
  AccountOrdersRoute
};
const AccountRouteWithChildren = AccountRoute._addFileChildren(AccountRouteChildren);
const AdminRouteChildren = {
  AdminCategoriesRoute,
  AdminMessagesRoute,
  AdminOrdersRoute,
  AdminProductsRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AccountRoute: AccountRouteWithChildren,
  AdminRoute: AdminRouteWithChildren,
  CartRoute,
  CheckoutRoute,
  ContactRoute,
  HelpRoute,
  LoginRoute,
  SignupRoute,
  OrderOrderNumberRoute,
  ProductSlugRoute,
  ShopCategoryRoute,
  ShopIndexRoute
};
const routeTree = Route$k._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ORDER_STATUS_LABELS as O,
  Route$7 as R,
  SITE as S,
  useCart as a,
  updateProfile as b,
  createSsrRpc as c,
  Route$6 as d,
  Route$5 as e,
  formatINR as f,
  router as r,
  sendOtp as s,
  useAuth as u,
  verifyOtp as v
};
