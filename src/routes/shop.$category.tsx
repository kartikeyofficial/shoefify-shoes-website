import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { formatINR } from "@/lib/site";
import { getCategories } from "@/lib/category.functions";
import { getPublicProducts } from "@/lib/product.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/shop/$category")({
  head: ({ params }) => ({ meta: [{ title: `${params.category} shoes — Shoefify` }, { name: "description", content: `Shop ${params.category} shoes at Shoefify.` }] }),
  component: ShopCategory,
});

interface Product { id: string; name: string; slug: string; price: number; compare_at_price: number | null; images: string[]; brand: string | null; }

function ShopCategory() {
  const { category } = Route.useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [catName, setCatName] = useState(category);
  const [loading, setLoading] = useState(true);
  const getCategoriesFn = useServerFn(getCategories);
  const getPublicProductsFn = useServerFn(getPublicProducts);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const cats: any = await getCategoriesFn();
        const cat = cats.find((c: any) => c.slug === category);
        if (!cat) { setProducts([]); setLoading(false); return; }
        
        setCatName(cat.name);
        const data = await getPublicProductsFn({ data: { categoryId: cat.id } });
        setProducts(data as any);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="text-xs uppercase tracking-widest text-muted-foreground"><Link to="/shop">Shop</Link> / {catName}</div>
      <h1 className="mt-3 font-display text-5xl capitalize">{catName}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{products.length} products</p>

      <div className="mt-10">
        {loading ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-square animate-pulse bg-secondary" />)}</div>
        ) : products.length === 0 ? (
          <div className="rounded border border-dashed border-border p-16 text-center text-muted-foreground">No products in this category yet.</div>
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
                  <div className="mt-1 text-sm">{formatINR(p.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
