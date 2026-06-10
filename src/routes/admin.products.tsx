import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatINR } from "@/lib/site";
import { Trash2, Pencil, Plus } from "lucide-react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/lib/product.functions";
import { getCategories } from "@/lib/category.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

interface Product {
  id: string; name: string; slug: string; price: number; compare_at_price: number | null;
  brand: string | null; description: string | null; images: string[];
  category_id: string | null; is_active: boolean; is_featured: boolean;
  variants?: { size: string; stock: number }[];
}
interface Cat { id: string; name: string; }

const empty: Omit<Product, "id"> & { sizes: string; newImageUrl: string } = {
  name: "", slug: "", price: 0, compare_at_price: null, brand: "", description: "",
  images: [], category_id: null, is_active: true, is_featured: false, sizes: "7,8,9,10,11", newImageUrl: ""
};

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [editing, setEditing] = useState<(typeof empty & { id?: string }) | null>(null);
  
  const getProductsFn = useServerFn(getProducts);
  const createProductFn = useServerFn(createProduct);
  const updateProductFn = useServerFn(updateProduct);
  const deleteProductFn = useServerFn(deleteProduct);
  const getCategoriesFn = useServerFn(getCategories);

  const load = async () => {
    try {
      const data = await getProductsFn();
      setProducts(data as any);
      const catData = await getCategoriesFn();
      setCats(catData as any);
    } catch (e: any) {
      toast.error(e.message || "Failed to load products");
    }
  };
  
  useEffect(() => {
    load();
  }, []);

  const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const save = async () => {
    if (!editing) return;
    if (!editing.name || !editing.price) return toast.error("Name and price required.");
    const slug = editing.slug || slugify(editing.name);
    
    const sizesArray = editing.sizes.split(",").map((s) => s.trim()).filter(Boolean);
    const variants = sizesArray.map(size => ({ size, stock: 10 }));

    const payload = {
      name: editing.name, slug, price: editing.price, compare_at_price: editing.compare_at_price,
      brand: editing.brand, description: editing.description, images: editing.images,
      category_id: editing.category_id || null, is_active: editing.is_active, is_featured: editing.is_featured,
      variants
    };

    try {
      if (editing.id) {
        await updateProductFn({ data: { id: editing.id, ...payload } });
      } else {
        await createProductFn({ data: payload });
      }
      toast.success("Saved.");
      setEditing(null);
      load();
    } catch (e: any) {
      toast.error(e.message || "Error saving product");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProductFn({ data: { id } });
      toast.success("Deleted.");
      load();
    } catch (e: any) {
      toast.error(e.message || "Error deleting product");
    }
  };

  const edit = async (p: Product) => {
    const sizes = p.variants ? p.variants.map(v => v.size).join(",") : "";
    setEditing({ ...p, sizes, newImageUrl: "" });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl">Products ({products.length})</h2>
        <button onClick={() => setEditing({ ...empty })} className="inline-flex items-center gap-2 bg-foreground px-4 py-2 text-xs uppercase tracking-widest text-background">
          <Plus className="size-4" /> Add product
        </button>
      </div>

      <div className="overflow-x-auto border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left text-xs uppercase tracking-widest">
            <tr><th className="p-3">Image</th><th className="p-3">Name</th><th className="p-3">Price</th><th className="p-3">Active</th><th className="p-3">Featured</th><th className="p-3"></th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="p-3"><div className="size-12 bg-secondary">{p.images[0] && <img src={p.images[0]} alt="" className="size-full object-cover" />}</div></td>
                <td className="p-3"><div>{p.name}</div><div className="text-xs text-muted-foreground">{p.slug}</div></td>
                <td className="p-3">{formatINR(p.price)}</td>
                <td className="p-3">{p.is_active ? "Yes" : "No"}</td>
                <td className="p-3">{p.is_featured ? "Yes" : "No"}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => edit(p)} className="p-2 hover:bg-secondary"><Pencil className="size-4" /></button>
                    <button onClick={() => remove(p.id)} className="p-2 hover:bg-secondary"><Trash2 className="size-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No products yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4">
          <div className="my-8 w-full max-w-2xl bg-background p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl">{editing.id ? "Edit product" : "New product"}</h3>
              <button onClick={() => setEditing(null)} className="text-sm">Close</button>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <input placeholder="Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="col-span-2 border border-border bg-background px-3 py-2" />
              <input placeholder="Slug (auto)" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="col-span-2 border border-border bg-background px-3 py-2" />
              <input placeholder="Brand" value={editing.brand ?? ""} onChange={(e) => setEditing({ ...editing, brand: e.target.value })} className="border border-border bg-background px-3 py-2" />
              <select value={editing.category_id ?? ""} onChange={(e) => setEditing({ ...editing, category_id: e.target.value || null })} className="border border-border bg-background px-3 py-2">
                <option value="">— No category —</option>
                {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input type="number" placeholder="Price (INR)" value={editing.price || ""} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} className="border border-border bg-background px-3 py-2" />
              <input type="number" placeholder="Compare-at price" value={editing.compare_at_price ?? ""} onChange={(e) => setEditing({ ...editing, compare_at_price: e.target.value ? Number(e.target.value) : null })} className="border border-border bg-background px-3 py-2" />
              <textarea placeholder="Description" rows={4} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="col-span-2 border border-border bg-background px-3 py-2" />
              <input placeholder="Sizes (comma-separated, e.g. 7,8,9,10)" value={editing.sizes} onChange={(e) => setEditing({ ...editing, sizes: e.target.value })} className="col-span-2 border border-border bg-background px-3 py-2" />

              <div className="col-span-2">
                <div className="mb-2 text-xs uppercase tracking-widest">Images</div>
                <div className="flex flex-wrap gap-2 items-center">
                  {editing.images.map((u, i) => (
                    <div key={i} className="relative size-20 bg-secondary">
                      <img src={u} alt="" className="size-full object-cover" />
                      <button onClick={() => setEditing({ ...editing, images: editing.images.filter((_, j) => j !== i) })} className="absolute -right-1 -top-1 rounded-full bg-foreground p-1 text-background"><Trash2 className="size-3" /></button>
                    </div>
                  ))}
                  <div className="flex gap-2 w-full mt-2">
                    <input 
                      placeholder="Paste Image URL here..." 
                      value={editing.newImageUrl} 
                      onChange={(e) => setEditing({...editing, newImageUrl: e.target.value})}
                      className="flex-1 border border-border bg-background px-3 py-2 text-sm"
                    />
                    <button 
                      onClick={() => {
                        if (editing.newImageUrl) {
                          setEditing({...editing, images: [...editing.images, editing.newImageUrl], newImageUrl: ""});
                        }
                      }}
                      className="bg-secondary px-4 text-sm"
                    >
                      Add URL
                    </button>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} /> Active</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.is_featured} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} /> Featured on home</label>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={save} className="bg-foreground px-6 py-2 text-sm uppercase tracking-widest text-background">Save</button>
              <button onClick={() => setEditing(null)} className="border border-border px-6 py-2 text-sm uppercase tracking-widest">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
