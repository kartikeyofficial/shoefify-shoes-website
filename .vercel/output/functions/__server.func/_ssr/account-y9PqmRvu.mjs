import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, O as ORDER_STATUS_LABELS, f as formatINR, b as updateProfile } from "./router-CHbF3jR6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as getMyOrders } from "./order.functions-DttxRx8H.mjs";
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
import "./server-N1mLFSER.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
function AccountPage() {
  const nav = useNavigate();
  const {
    user,
    loading,
    signOut,
    isAdmin
  } = useAuth();
  const [profile, setProfile] = reactExports.useState({
    full_name: "",
    phone: "",
    avatar_url: ""
  });
  const [orders, setOrders] = reactExports.useState([]);
  const getOrders = useServerFn(getMyOrders);
  const updateProfileFn = useServerFn(updateProfile);
  reactExports.useEffect(() => {
    if (!loading && !user) nav({
      to: "/login"
    });
  }, [user, loading, nav]);
  reactExports.useEffect(() => {
    if (!user) return;
    setProfile({
      full_name: user.full_name ?? "",
      phone: user.phone ?? "",
      avatar_url: user.avatar_url ?? ""
    });
    getOrders().then((data) => setOrders(data.slice(0, 5))).catch((e) => toast.error(e.message || "Failed to load orders"));
  }, [user]);
  const save = async () => {
    if (!user) return;
    try {
      await updateProfileFn({
        data: profile
      });
      toast.success("Saved.");
    } catch (e) {
      toast.error(e.message || "Failed to update profile");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl", children: "My account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => signOut().then(() => nav({
        to: "/"
      })), className: "text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground", children: "Sign out" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-10 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-32 overflow-hidden rounded-full bg-secondary", children: profile.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: profile.avatar_url, alt: "", className: "size-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-full items-center justify-center text-3xl text-muted-foreground", children: (profile.full_name || user?.email || "?")[0]?.toUpperCase() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-xs uppercase tracking-widest text-muted-foreground", children: "Avatar URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Paste image URL here...", value: profile.avatar_url, onChange: (e) => setProfile({
          ...profile,
          avatar_url: e.target.value
        }), className: "mt-1 w-full border border-border bg-background px-3 py-2 text-sm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: user?.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Full name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: profile.full_name, onChange: (e) => setProfile({
            ...profile,
            full_name: e.target.value
          }), className: "mt-1 w-full border border-border bg-background px-4 py-2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: profile.phone, onChange: (e) => setProfile({
            ...profile,
            phone: e.target.value
          }), className: "mt-1 w-full border border-border bg-background px-4 py-2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, className: "bg-foreground px-6 py-2 text-sm uppercase tracking-widest text-background", children: "Save" }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "ml-3 inline-block border border-foreground px-6 py-2 text-sm uppercase tracking-widest", children: "Admin dashboard" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl", children: "Recent orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/account/orders", className: "text-sm uppercase tracking-widest text-accent", children: "View all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 divide-y divide-border border-y border-border", children: orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-muted-foreground", children: "No orders yet." }) : orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
            "#",
            o.order_number
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: new Date(o.createdAt).toLocaleDateString() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: ORDER_STATUS_LABELS[o.status] || o.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: formatINR(o.total) })
      ] }, o.id)) })
    ] })
  ] });
}
export {
  AccountPage as component
};
