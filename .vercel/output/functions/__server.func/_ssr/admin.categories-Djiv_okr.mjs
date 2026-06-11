import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as getCategories, c as createCategory, d as deleteCategory } from "./category.functions-BjB2f4Hw.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import "../_libs/seroval.mjs";
import { P as Plus, T as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "./router-CHbF3jR6.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "./server-N1mLFSER.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "../_libs/zod.mjs";
function AdminCategories() {
  const [cats, setCats] = reactExports.useState([]);
  const [name, setName] = reactExports.useState("");
  const [slug, setSlug] = reactExports.useState("");
  const getCategoriesFn = useServerFn(getCategories);
  const createCategoryFn = useServerFn(createCategory);
  const deleteCategoryFn = useServerFn(deleteCategory);
  const load = () => {
    getCategoriesFn().then((data) => setCats(data)).catch((e) => toast.error(e.message || "Failed to load categories"));
  };
  reactExports.useEffect(() => {
    load();
  }, []);
  const add = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      await createCategoryFn({
        data: {
          name,
          sort_order: cats.length
        }
      });
      setName("");
      setSlug("");
      load();
    } catch (e2) {
      toast.error(e2.message || "Error adding category");
    }
  };
  const remove = async (id) => {
    if (!confirm("Delete?")) return;
    try {
      await deleteCategoryFn({
        data: {
          id
        }
      });
      load();
    } catch (e) {
      toast.error(e.message || "Error deleting category");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Categories" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: add, className: "mt-6 flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Name", value: name, onChange: (e) => setName(e.target.value), className: "flex-1 border border-border bg-background px-3 py-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Slug (optional)", value: slug, onChange: (e) => setSlug(e.target.value), className: "flex-1 border border-border bg-background px-3 py-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-2 bg-foreground px-4 py-2 text-xs uppercase tracking-widest text-background", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
        " Add"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 divide-y divide-border border border-border", children: cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          "/shop/",
          c.slug
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(c.id), className: "p-2 hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
    ] }, c.id)) })
  ] });
}
export {
  AdminCategories as component
};
