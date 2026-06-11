import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-CHbF3jR6.mjs";
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
function AdminLayout() {
  const nav = useNavigate();
  const {
    user,
    isAdmin,
    loading
  } = useAuth();
  reactExports.useEffect(() => {
    if (loading) return;
    if (!user) nav({
      to: "/login"
    });
    else if (!isAdmin) nav({
      to: "/"
    });
  }, [user, isAdmin, loading, nav]);
  if (loading || !user || !isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-20 text-center text-sm text-muted-foreground", children: "Checking access…" });
  const links = [{
    to: "/admin",
    label: "Dashboard",
    exact: true
  }, {
    to: "/admin/products",
    label: "Products"
  }, {
    to: "/admin/categories",
    label: "Categories"
  }, {
    to: "/admin/orders",
    label: "Orders"
  }, {
    to: "/admin/messages",
    label: "Messages"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 border-b border-border pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Admin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "mt-4 flex flex-wrap gap-2", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: l.to, activeOptions: {
        exact: l.exact
      }, activeProps: {
        className: "bg-foreground text-background"
      }, className: "border border-border px-4 py-1.5 text-xs uppercase tracking-widest", children: l.label }, l.to)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] });
}
export {
  AdminLayout as component
};
