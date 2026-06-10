import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBag, User as UserIcon, Menu, X, LayoutGrid } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-store";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  const { user, isAdmin } = useAuth();
  const count = useCart((s) => s.count());
  const [open, setOpen] = useState(false);



  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="font-display text-2xl tracking-tight">
          {SITE.name}<span className="text-accent">.</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/shop" className="text-sm hover:text-accent">Shop</Link>
          <Link to="/shop/$category" params={{ category: "men" }} className="text-sm hover:text-accent">Men</Link>
          <Link to="/shop/$category" params={{ category: "women" }} className="text-sm hover:text-accent">Women</Link>
          <Link to="/shop/$category" params={{ category: "sneakers" }} className="text-sm hover:text-accent">Sneakers</Link>
          <Link to="/shop/$category" params={{ category: "formal" }} className="text-sm hover:text-accent">Formal</Link>
          <Link to="/shop/$category" params={{ category: "sports" }} className="text-sm hover:text-accent">Sports</Link>
          <Link to="/shop/$category" params={{ category: "kid" }} className="text-sm hover:text-accent">Kids</Link>
          <Link to="/about" className="text-sm hover:text-accent">About</Link>
          <Link to="/help" className="text-sm hover:text-accent">Help</Link>
        </nav>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link to="/admin" className="inline-flex items-center gap-1 rounded border border-border px-2 py-1.5 text-xs uppercase tracking-wide hover:bg-secondary md:px-3">
              <LayoutGrid className="size-3.5" /> <span className="hidden sm:inline">Admin</span>
            </Link>
          )}
          <Link to={user ? "/account" : "/login"} className="rounded-full p-2 hover:bg-secondary" aria-label="account">
            <UserIcon className="size-5" />
          </Link>
          <Link to="/cart" className="relative rounded-full p-2 hover:bg-secondary" aria-label="cart">
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
          <button className="rounded-full p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="menu">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3">
            <Link to="/shop" onClick={() => setOpen(false)} className="py-2 text-sm">Shop</Link>
            <Link to="/shop/$category" params={{ category: "men" }} onClick={() => setOpen(false)} className="py-2 text-sm">Men</Link>
            <Link to="/shop/$category" params={{ category: "women" }} onClick={() => setOpen(false)} className="py-2 text-sm">Women</Link>
            <Link to="/shop/$category" params={{ category: "sneakers" }} onClick={() => setOpen(false)} className="py-2 text-sm">Sneakers</Link>
            <Link to="/shop/$category" params={{ category: "formal" }} onClick={() => setOpen(false)} className="py-2 text-sm">Formal</Link>
            <Link to="/shop/$category" params={{ category: "sports" }} onClick={() => setOpen(false)} className="py-2 text-sm">Sports</Link>
            <Link to="/shop/$category" params={{ category: "kid" }} onClick={() => setOpen(false)} className="py-2 text-sm">Kids</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="py-2 text-sm">About</Link>
            <Link to="/help" onClick={() => setOpen(false)} className="py-2 text-sm">Help</Link>
            {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="py-2 text-sm text-accent">Admin</Link>}
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl">{SITE.name}<span className="text-accent">.</span></div>
          <p className="mt-3 text-sm text-muted-foreground">{SITE.tagline}</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest">Shop</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop/$category" params={{ category: "men" }}>Men</Link></li>
            <li><Link to="/shop/$category" params={{ category: "women" }}>Women</Link></li>
            <li><Link to="/shop/$category" params={{ category: "sneakers" }}>Sneakers</Link></li>
            <li><Link to="/shop/$category" params={{ category: "formal" }}>Formal</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest">Company</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/help">Help & Feedback</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest">Contact</div>
          <p className="mt-4 text-sm text-muted-foreground">
            <a href={`mailto:${SITE.email}`} className="hover:text-foreground">{SITE.email}</a>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{SITE.domain}</p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
