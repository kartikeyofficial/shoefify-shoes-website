import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { formatINR } from "@/lib/site";
import { getPublicProducts } from "@/lib/product.functions";
import { getCategories } from "@/lib/category.functions";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/shop/")({
  head: () => ({ meta: [{ title: "Shop all shoes — Shoefify" }, { name: "description", content: "Browse all shoes — sneakers, formal, sports, and more." }] }),
  component: ShopAll,
});

interface Product { id: string; name: string; slug: string; price: number; compare_at_price: number | null; images: string[]; brand: string | null; category_id: string | null; }
interface Cat { id: string; name: string; slug: string; }

function ShopAll() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cats, setCats] = useState<Cat[]>([]);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [sort, setSort] = useState("new");
  const [loading, setLoading] = useState(true);
  const getCategoriesFn = useServerFn(getCategories);
  const getPublicProductsFn = useServerFn(getPublicProducts);

  useEffect(() => {
    getCategoriesFn()
      .then((data) => setCats(data as any))
      .catch((e: any) => toast.error(e.message || "Failed to load categories"));
  }, []);

  useEffect(() => {
    setLoading(true);
    getPublicProductsFn({ data: { categoryId: activeCat, sort } })
      .then((data) => setProducts(data as any))
      .catch((e: any) => toast.error(e.message || "Failed to load products"))
      .finally(() => setLoading(false));
  }, [activeCat, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-5xl">Shop</h1>
          <p className="mt-2 text-sm text-muted-foreground">{products.length} products</p>
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-border bg-background px-3 py-2 text-sm">
          <option value="new">Newest</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
        </select>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button onClick={() => setActiveCat(null)} className={`border px-4 py-1.5 text-xs uppercase tracking-widest ${!activeCat ? "border-foreground bg-foreground text-background" : "border-border"}`}>All</button>
        {cats.map((c) => (
          <button key={c.id} onClick={() => setActiveCat(c.id)} className={`border px-4 py-1.5 text-xs uppercase tracking-widest ${activeCat === c.id ? "border-foreground bg-foreground text-background" : "border-border"}`}>{c.name}</button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-square animate-pulse bg-secondary" />)}</div>
      ) : products.length === 0 ? (
        <div className="rounded border border-dashed border-border p-16 text-center text-muted-foreground">No products yet.</div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <Link key={p.id} to="/product/$slug" params={{ slug: p.slug }} className="group">
              <div className="aspect-square overflow-hidden bg-secondary">
                {p.images[0] && <img src={p.images[0]} alt={p.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />}
              </div>
              <div className="mt-3">
                {p.brand && <div className="text-xs uppercase tracking-widest text-muted-foreground">{p.brand}</div>}
                <div className="mt-1 text-sm">{p.name}</div>
                <div className="mt-1 flex items-center gap-2 text-sm">
                  <span>{formatINR(p.price)}</span>
                  {p.compare_at_price && <span className="text-xs text-muted-foreground line-through">{formatINR(p.compare_at_price)}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
