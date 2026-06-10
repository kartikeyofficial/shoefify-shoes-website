import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Shoefify" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const nav = useNavigate();
  const { user, isAdmin, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) nav({ to: "/login" });
    else if (!isAdmin) nav({ to: "/" });
  }, [user, isAdmin, loading, nav]);

  if (loading || !user || !isAdmin) return <div className="px-5 py-20 text-center text-sm text-muted-foreground">Checking access…</div>;

  const links = [
    { to: "/admin", label: "Dashboard", exact: true },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/categories", label: "Categories" },
    { to: "/admin/orders", label: "Orders" },
    { to: "/admin/messages", label: "Messages" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="font-display text-4xl">Admin</h1>
        <nav className="mt-4 flex flex-wrap gap-2">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: l.exact }} activeProps={{ className: "bg-foreground text-background" }} className="border border-border px-4 py-1.5 text-xs uppercase tracking-widest">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
