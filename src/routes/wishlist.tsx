import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { formatINR } from "@/lib/site";
import { getWishlistItems, toggleWishlistItem } from "@/lib/wishlist.functions";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { useAuth } from "@/lib/auth-context";
import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Your wishlist — Shoefify" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const nav = useNavigate();
  const getWishlistItemsFn = useServerFn(getWishlistItems);
  const toggleWishlistFn = useServerFn(toggleWishlistItem);
  const queryClient = useQueryClient();

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      nav({ to: "/login" });
    }
  }, [user, authLoading, nav]);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await getWishlistItemsFn();
      setItems(data as any[]);
    } catch (e: any) {
      toast.error(e.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  const handleRemove = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    try {
      await toggleWishlistFn({ data: { productId } });
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist-count"] });
      setItems(items.filter((i) => i.product.id !== productId));
    } catch (e: any) {
      toast.error(e.message || "Failed to remove item");
    }
  };

  if (authLoading) return <div className="mx-auto max-w-7xl px-5 py-20"><div className="h-96 animate-pulse bg-secondary" /></div>;
  if (!user) return null;

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="font-display text-5xl">Your wishlist</h1>
      
      {loading ? (
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="aspect-square animate-pulse bg-secondary" />)}
        </div>
      ) : items.length === 0 ? (
        <div className="mt-10 mx-auto max-w-md py-32 text-center">
          <p className="mt-3 text-sm text-muted-foreground">Your wishlist is empty.</p>
          <Link to="/shop" className="mt-8 inline-flex bg-foreground px-7 py-3 text-sm uppercase tracking-widest text-background">Shop now</Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {items.map((i) => {
            const p = i.product;
            if (!p) return null;
            return (
              <Link key={i.id} to="/product/$slug" params={{ slug: p.slug }} className="group relative block">
                <div className="aspect-square overflow-hidden bg-secondary">
                  {p.images[0] && <img src={p.images[0]} alt={p.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />}
                </div>
                <button
                  onClick={(e) => handleRemove(e, p.id)}
                  className="absolute right-3 top-3 rounded-full bg-background/80 p-2 text-muted-foreground backdrop-blur hover:bg-background hover:text-foreground transition-all"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="size-4" />
                </button>
                <div className="mt-3">
                  {p.brand && <div className="text-xs uppercase tracking-widest text-muted-foreground">{p.brand}</div>}
                  <div className="mt-1 text-sm">{p.name}</div>
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <span>{formatINR(p.price)}</span>
                    {p.compare_at_price && <span className="text-xs text-muted-foreground line-through">{formatINR(p.compare_at_price)}</span>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
