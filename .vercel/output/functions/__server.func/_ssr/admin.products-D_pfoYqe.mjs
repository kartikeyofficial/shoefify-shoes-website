import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { f as formatINR } from "./router-VAEstg49.mjs";
import { b as getProducts, d as deleteProduct, u as updateProduct, c as createProduct } from "./product.functions-DLUq6e1b.mjs";
import { g as getCategories } from "./category.functions-DyySdiuq.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import "../_libs/seroval.mjs";
import { P as Plus, b as Pencil, T as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
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
import "./server-CutrnPlu.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zustand.mjs";
import "../_libs/zod.mjs";
const empty = {
  name: "",
  slug: "",
  price: 0,
  compare_at_price: null,
  brand: "",
  description: "",
  images: [],
  category_id: null,
  is_active: true,
  is_featured: false,
  sizes: "7,8,9,10,11",
  newImageUrl: ""
};
function AdminProducts() {
  const [products, setProducts] = reactExports.useState([]);
  const [cats, setCats] = reactExports.useState([]);
  const [editing, setEditing] = reactExports.useState(null);
  const getProductsFn = useServerFn(getProducts);
  const createProductFn = useServerFn(createProduct);
  const updateProductFn = useServerFn(updateProduct);
  const deleteProductFn = useServerFn(deleteProduct);
  const getCategoriesFn = useServerFn(getCategories);
  const load = async () => {
    try {
      const data = await getProductsFn();
      setProducts(data);
      const catData = await getCategoriesFn();
      setCats(catData);
    } catch (e) {
      toast.error(e.message || "Failed to load products");
    }
  };
  reactExports.useEffect(() => {
    load();
  }, []);
  const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const save = async () => {
    if (!editing) return;
    if (!editing.name || !editing.price) return toast.error("Name and price required.");
    const slug = editing.slug || slugify(editing.name);
    const sizesArray = editing.sizes.split(",").map((s) => s.trim()).filter(Boolean);
    const variants = sizesArray.map((size) => ({
      size,
      stock: 10
    }));
    const payload = {
      name: editing.name,
      slug,
      price: editing.price,
      compare_at_price: editing.compare_at_price,
      brand: editing.brand,
      description: editing.description,
      images: editing.images,
      category_id: editing.category_id || null,
      is_active: editing.is_active,
      is_featured: editing.is_featured,
      variants
    };
    try {
      if (editing.id) {
        await updateProductFn({
          data: {
            id: editing.id,
            ...payload
          }
        });
      } else {
        await createProductFn({
          data: payload
        });
      }
      toast.success("Saved.");
      setEditing(null);
      load();
    } catch (e) {
      toast.error(e.message || "Error saving product");
    }
  };
  const remove = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProductFn({
        data: {
          id
        }
      });
      toast.success("Deleted.");
      load();
    } catch (e) {
      toast.error(e.message || "Error deleting product");
    }
  };
  const edit = async (p) => {
    const sizes = p.variants ? p.variants.map((v) => v.size).join(",") : "";
    setEditing({
      ...p,
      sizes,
      newImageUrl: ""
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl", children: [
        "Products (",
        products.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing({
        ...empty
      }), className: "inline-flex items-center gap-2 bg-foreground px-4 py-2 text-xs uppercase tracking-widest text-background", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
        " Add product"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary text-left text-xs uppercase tracking-widest", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Featured" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
        products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 bg-secondary", children: p.images[0] && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.images[0], alt: "", className: "size-full object-cover" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: p.slug })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: formatINR(p.price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: p.is_active ? "Yes" : "No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: p.is_featured ? "Yes" : "No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => edit(p), className: "p-2 hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(p.id), className: "p-2 hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
          ] }) })
        ] }, p.id)),
        products.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-8 text-center text-muted-foreground", children: "No products yet." }) })
      ] })
    ] }) }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-8 w-full max-w-2xl bg-background p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl", children: editing.id ? "Edit product" : "New product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), className: "text-sm", children: "Close" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Name", value: editing.name, onChange: (e) => setEditing({
          ...editing,
          name: e.target.value
        }), className: "col-span-2 border border-border bg-background px-3 py-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Slug (auto)", value: editing.slug, onChange: (e) => setEditing({
          ...editing,
          slug: e.target.value
        }), className: "col-span-2 border border-border bg-background px-3 py-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Brand", value: editing.brand ?? "", onChange: (e) => setEditing({
          ...editing,
          brand: e.target.value
        }), className: "border border-border bg-background px-3 py-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editing.category_id ?? "", onChange: (e) => setEditing({
          ...editing,
          category_id: e.target.value || null
        }), className: "border border-border bg-background px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— No category —" }),
          cats.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: c.name }, c.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "Price (INR)", value: editing.price || "", onChange: (e) => setEditing({
          ...editing,
          price: Number(e.target.value)
        }), className: "border border-border bg-background px-3 py-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "Compare-at price", value: editing.compare_at_price ?? "", onChange: (e) => setEditing({
          ...editing,
          compare_at_price: e.target.value ? Number(e.target.value) : null
        }), className: "border border-border bg-background px-3 py-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { placeholder: "Description", rows: 4, value: editing.description ?? "", onChange: (e) => setEditing({
          ...editing,
          description: e.target.value
        }), className: "col-span-2 border border-border bg-background px-3 py-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Sizes (comma-separated, e.g. 7,8,9,10)", value: editing.sizes, onChange: (e) => setEditing({
          ...editing,
          sizes: e.target.value
        }), className: "col-span-2 border border-border bg-background px-3 py-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-xs uppercase tracking-widest", children: "Images" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
            editing.images.map((u, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative size-20 bg-secondary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: u, alt: "", className: "size-full object-cover" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing({
                ...editing,
                images: editing.images.filter((_, j) => j !== i)
              }), className: "absolute -right-1 -top-1 rounded-full bg-foreground p-1 text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3" }) })
            ] }, i)),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Paste Image URL here...", value: editing.newImageUrl, onChange: (e) => setEditing({
                ...editing,
                newImageUrl: e.target.value
              }), className: "flex-1 border border-border bg-background px-3 py-2 text-sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                if (editing.newImageUrl) {
                  setEditing({
                    ...editing,
                    images: [...editing.images, editing.newImageUrl],
                    newImageUrl: ""
                  });
                }
              }, className: "bg-secondary px-4 text-sm", children: "Add URL" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: editing.is_active, onChange: (e) => setEditing({
            ...editing,
            is_active: e.target.checked
          }) }),
          " Active"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: editing.is_featured, onChange: (e) => setEditing({
            ...editing,
            is_featured: e.target.checked
          }) }),
          " Featured on home"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, className: "bg-foreground px-6 py-2 text-sm uppercase tracking-widest text-background", children: "Save" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), className: "border border-border px-6 py-2 text-sm uppercase tracking-widest", children: "Cancel" })
      ] })
    ] }) })
  ] });
}
export {
  AdminProducts as component
};
