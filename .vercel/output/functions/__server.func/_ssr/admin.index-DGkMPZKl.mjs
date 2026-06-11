import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as formatINR, c as createSsrRpc } from "./router-unSNHeYa.mjs";
import { c as createServerFn } from "./server-CR7JDUVD.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/zustand.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const getAdminStats = createServerFn({
  method: "GET"
}).handler(createSsrRpc("4fec70c92c2624b017310f557d52373f6e45b4f5283a3272a864213d4d65e68d"));
function AdminDashboard() {
  const [stats, setStats] = reactExports.useState({
    products: 0,
    orders: 0,
    pendingOrders: 0,
    revenue: 0,
    messages: 0
  });
  const getStatsFn = useServerFn(getAdminStats);
  reactExports.useEffect(() => {
    getStatsFn().then(setStats).catch(console.error);
  }, []);
  const cards = [{
    label: "Total products",
    value: stats.products
  }, {
    label: "Total orders",
    value: stats.orders
  }, {
    label: "Pending orders",
    value: stats.pendingOrders
  }, {
    label: "Revenue (paid)",
    value: formatINR(stats.revenue)
  }, {
    label: "New messages",
    value: stats.messages
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-secondary/40 p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: c.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-4xl", children: c.value })
  ] }, c.label)) });
}
export {
  AdminDashboard as component
};
