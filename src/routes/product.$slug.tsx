import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getProductBySlug } from "@/lib/product.functions";
import { useServerFn } from "@tanstack/react-start";
import { formatINR } from "@/lib/site";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => ({ meta: [{ title: `${params.slug} — Shoefify` }] }),
  component: ProductPage,
});

interface Product {
  id: string; name: string; slug: string; price: number; compare_at_price: number | null;
  images: string[]; brand: string | null; description: string | null;
  variants?: Variant[];
}
interface Variant { id: string; size: string; stock: number; _id?: string; }

function ProductPage() {
  const { slug } = Route.useParams();
  const nav = useNavigate();
  const add = useCart((s) => s.add);
  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [size, setSize] = useState<Variant | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const getProductBySlugFn = useServerFn(getProductBySlug);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const p = await getProductBySlugFn({ data: { slug } });
        if (p) {
          setProduct(p as Product);
          setVariants(p.variants?.map((v: any) => ({ ...v, id: v._id })) ?? []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return <div className="mx-auto max-w-7xl px-5 py-20"><div className="h-96 animate-pulse bg-secondary" /></div>;
  if (!product) return <div className="mx-auto max-w-md px-5 py-32 text-center"><h1 className="font-display text-3xl">Product not found</h1></div>;

  const handleAdd = () => {
    if (variants.length > 0 && !size) return toast.error("Please pick a size.");
    add({
      productId: product.id, variantId: size?.id ?? null, name: product.name,
      price: product.price, image: product.images[0] ?? "", size: size?.size ?? null, qty: 1, slug: product.slug,
    });
    toast.success("Added to bag.");
  };
  const buyNow = () => { handleAdd(); nav({ to: "/checkout" }); };

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden bg-secondary">
            {product.images[imgIdx] && <img src={product.images[imgIdx]} alt={product.name} className="size-full object-cover" />}
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {product.images.map((src, i) => (
                <button key={i} onClick={() => setImgIdx(i)} className={`aspect-square overflow-hidden bg-secondary ${i === imgIdx ? "ring-2 ring-foreground" : ""}`}>
                  <img src={src} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          {product.brand && <div className="text-xs uppercase tracking-widest text-muted-foreground">{product.brand}</div>}
          <h1 className="mt-2 font-display text-4xl">{product.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl">{formatINR(product.price)}</span>
            {product.compare_at_price && <span className="text-sm text-muted-foreground line-through">{formatINR(product.compare_at_price)}</span>}
          </div>
          {product.description && <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>}

          {variants.length > 0 && (
            <div className="mt-8">
              <div className="text-xs uppercase tracking-widest">Select size</div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {variants.map((v) => (
                  <button key={v.id} disabled={v.stock <= 0} onClick={() => setSize(v)}
                    className={`border py-3 text-sm ${size?.id === v.id ? "border-foreground bg-foreground text-background" : "border-border"} ${v.stock <= 0 ? "line-through opacity-40" : ""}`}>
                    {v.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3">
            <button onClick={buyNow} className="bg-foreground py-4 text-sm uppercase tracking-widest text-background">Buy now</button>
            <button onClick={handleAdd} className="border border-foreground py-4 text-sm uppercase tracking-widest">Add to bag</button>
          </div>

          <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">Free shipping across India · 7-day easy returns</div>
        </div>
      </div>
    </div>
  );
}
