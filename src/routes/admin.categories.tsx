import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";
import { getCategories, createCategory, deleteCategory } from "@/lib/category.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

interface Cat { id: string; name: string; slug: string; sort_order: number; }

function AdminCategories() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const getCategoriesFn = useServerFn(getCategories);
  const createCategoryFn = useServerFn(createCategory);
  const deleteCategoryFn = useServerFn(deleteCategory);

  const load = () => {
    getCategoriesFn()
      .then((data) => setCats(data as any))
      .catch((e: any) => toast.error(e.message || "Failed to load categories"));
  };
  useEffect(() => { load(); }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    try {
      await createCategoryFn({ data: { name, sort_order: cats.length } });
      setName(""); setSlug("");
      load();
    } catch (e: any) {
      toast.error(e.message || "Error adding category");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    try {
      await deleteCategoryFn({ data: { id } });
      load();
    } catch (e: any) {
      toast.error(e.message || "Error deleting category");
    }
  };

  return (
    <div>
      <h2 className="font-display text-2xl">Categories</h2>
      <form onSubmit={add} className="mt-6 flex gap-2">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="flex-1 border border-border bg-background px-3 py-2" />
        <input placeholder="Slug (optional)" value={slug} onChange={(e) => setSlug(e.target.value)} className="flex-1 border border-border bg-background px-3 py-2" />
        <button className="inline-flex items-center gap-2 bg-foreground px-4 py-2 text-xs uppercase tracking-widest text-background"><Plus className="size-4" /> Add</button>
      </form>
      <div className="mt-6 divide-y divide-border border border-border">
        {cats.map((c) => (
          <div key={c.id} className="flex items-center justify-between p-3 text-sm">
            <div><div>{c.name}</div><div className="text-xs text-muted-foreground">/shop/{c.slug}</div></div>
            <button onClick={() => remove(c.id)} className="p-2 hover:bg-secondary"><Trash2 className="size-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
