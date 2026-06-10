import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { formatINR } from "@/lib/site";
import { getPublicProducts } from "@/lib/product.functions";
import { getCategories } from "@/lib/category.functions";
import { useServerFn } from "@tanstack/react-start";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shoefify — Footwear, considered." },
      { name: "description", content: "Premium shoes for men, women & kids. Sneakers, formal, sports. Shop the latest at Shoefify." },
      { property: "og:title", content: "Shoefify — Footwear, considered." },
      { property: "og:description", content: "Premium shoes for men, women & kids." },
    ],
  }),
  component: Home,
});

const slides = [
  { img: hero1, eyebrow: "New season", title: "Walk into\nthe warm light.", sub: "Crafted leather sneakers, made for everyday." },
  { img: hero2, eyebrow: "Formal", title: "Quiet luxury,\nstep by step.", sub: "Hand-finished loafers in rich burnished tones." },
  { img: hero3, eyebrow: "Sport", title: "Built for\nthe long mile.", sub: "Engineered runners with all-day cushion." },
];

interface Product { id: string; name: string; slug: string; price: number; images: string[]; brand: string | null; }
interface Category { name: string; slug: string; }

function Home() {
  const [idx, setIdx] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const getPublicProductsFn = useServerFn(getPublicProducts);
  const getCategoriesFn = useServerFn(getCategories);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    getPublicProductsFn({ data: {} })
      .then((data: any) => {
        // filter featured in the frontend for now, or we could update getPublicProducts to accept is_featured
        const featured = data.filter((p: any) => p.is_featured).slice(0, 8);
        setProducts(featured);
      });
    getCategoriesFn()
      .then((data: any) => setCats(data));
  }, []);

  return (
    <div>
      {/* Hero carousel */}
      <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden bg-secondary">
        {slides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`}>
            <img src={s.img} alt="" className="size-full object-cover" width={1920} height={1280} />
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent" />
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-5 pb-20 md:items-center md:pb-0">
              <div className="max-w-xl">
                <div className="text-xs uppercase tracking-[0.25em] text-accent">{s.eyebrow}</div>
                <h1 className="mt-4 whitespace-pre-line font-display text-5xl leading-[1.05] md:text-7xl">{s.title}</h1>
                <p className="mt-5 max-w-md text-base text-muted-foreground">{s.sub}</p>
                <Link to="/shop" className="mt-8 inline-flex items-center rounded-none border border-foreground bg-foreground px-7 py-3 text-sm uppercase tracking-widest text-background hover:bg-transparent hover:text-foreground">
                  Shop the collection
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`slide ${i + 1}`}
              className={`h-1 transition-all ${i === idx ? "w-8 bg-foreground" : "w-4 bg-foreground/30"}`} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-4xl">Shop by category</h2>
          <Link to="/shop" className="text-sm uppercase tracking-widest text-accent">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {cats.map((c) => (
            <Link key={c.slug} to="/shop/$category" params={{ category: c.slug }}
              className="group aspect-square overflow-hidden bg-secondary p-6 transition-colors hover:bg-accent hover:text-accent-foreground">
              <div className="flex h-full flex-col justify-between">
                <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground/80">Category</span>
                <span className="font-display text-2xl">{c.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-4xl">Featured</h2>
          <Link to="/shop" className="text-sm uppercase tracking-widest text-accent">All products</Link>
        </div>
        {products.length === 0 ? (
          <div className="rounded border border-dashed border-border p-12 text-center text-muted-foreground">
            No featured products yet. The admin can add them from the dashboard.
          </div>
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
      </section>

      {/* Brand strip */}
      <section className="mt-16 bg-foreground py-24 text-background">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <div className="text-xs uppercase tracking-[0.25em] text-accent">Our promise</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Made to last.<br/>Made to be worn.</h2>
          <p className="mt-6 text-background/70">Every Shoefify pair is built from materials we'd stand behind ourselves — supple leather, breathable knits, soles tuned for Indian streets. Free shipping pan-India. Easy 7-day returns.</p>
        </div>
      </section>
    </div>
  );
}
