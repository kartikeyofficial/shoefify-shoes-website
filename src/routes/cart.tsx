import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-store";
import { formatINR } from "@/lib/site";
import { Minus, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your bag — Shoefify" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-5 py-32 text-center">
        <h1 className="font-display text-4xl">Your bag is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">Find your next favorite pair.</p>
        <Link to="/shop" className="mt-8 inline-flex bg-foreground px-7 py-3 text-sm uppercase tracking-widest text-background">Shop now</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-display text-5xl">Your bag</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {items.map((i) => (
            <div key={`${i.productId}-${i.variantId}`} className="flex gap-4 border-b border-border pb-6">
              <Link to="/product/$slug" params={{ slug: i.slug }} className="size-28 shrink-0 overflow-hidden bg-secondary">
                {i.image && <img src={i.image} alt={i.name} className="size-full object-cover" />}
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="font-medium">{i.name}</div>
                  {i.size && <div className="text-xs text-muted-foreground">Size {i.size}</div>}
                  <div className="mt-1 text-sm">{formatINR(i.price)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center border border-border">
                    <button onClick={() => setQty(i.productId, i.variantId, i.qty - 1)} className="p-2"><Minus className="size-3" /></button>
                    <span className="w-8 text-center text-sm">{i.qty}</span>
                    <button onClick={() => setQty(i.productId, i.variantId, i.qty + 1)} className="p-2"><Plus className="size-3" /></button>
                  </div>
                  <button onClick={() => remove(i.productId, i.variantId)} className="text-muted-foreground hover:text-foreground"><Trash2 className="size-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-fit border border-border p-6">
          <div className="text-xs uppercase tracking-widest">Order summary</div>
          <div className="mt-4 flex justify-between text-sm"><span>Subtotal</span><span>{formatINR(total())}</span></div>
          <div className="mt-2 flex justify-between text-sm text-muted-foreground"><span>Shipping</span><span>Free</span></div>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-lg"><span>Total</span><span>{formatINR(total())}</span></div>
          <Link to="/checkout" className="mt-6 block bg-foreground py-3 text-center text-sm uppercase tracking-widest text-background">Checkout</Link>
        </div>
      </div>
    </div>
  );
}
