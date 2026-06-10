import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { formatINR, ORDER_STATUS_LABELS } from "@/lib/site";
import { toast } from "sonner";
import { getMyOrders } from "@/lib/order.functions";
import { updateProfile } from "@/lib/auth.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My account — Shoefify" }] }),
  component: AccountPage,
});

function AccountPage() {
  const nav = useNavigate();
  const { user, loading, signOut, isAdmin } = useAuth();
  const [profile, setProfile] = useState<{ full_name: string; phone: string; avatar_url: string }>({ full_name: "", phone: "", avatar_url: "" });
  const [orders, setOrders] = useState<Array<{ id: string; order_number: string; total: number; status: string; createdAt: string }>>([]);
  const getOrders = useServerFn(getMyOrders);
  const updateProfileFn = useServerFn(updateProfile);

  useEffect(() => { if (!loading && !user) nav({ to: "/login" }); }, [user, loading, nav]);

  useEffect(() => {
    if (!user) return;
    
    // User profile is now returned from the Auth context
    setProfile({ 
      full_name: (user as any).full_name ?? "", 
      phone: (user as any).phone ?? "", 
      avatar_url: (user as any).avatar_url ?? "" 
    });

    getOrders()
      .then((data) => setOrders((data as any).slice(0, 5)))
      .catch((e: any) => toast.error(e.message || "Failed to load orders"));
  }, [user]);

  const save = async () => {
    if (!user) return;
    try {
      await updateProfileFn({ data: profile });
      toast.success("Saved.");
      // The auth context doesn't auto-refresh the user object right now, 
      // but it will reflect on reload or next login.
    } catch (e: any) {
      toast.error(e.message || "Failed to update profile");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-5xl">My account</h1>
        <button onClick={() => signOut().then(() => nav({ to: "/" }))} className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground">Sign out</button>
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="size-32 overflow-hidden rounded-full bg-secondary">
            {profile.avatar_url ? <img src={profile.avatar_url} alt="" className="size-full object-cover" /> : <div className="flex size-full items-center justify-center text-3xl text-muted-foreground">{(profile.full_name || user?.email || "?")[0]?.toUpperCase()}</div>}
          </div>
          <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Avatar URL</div>
          <input 
            placeholder="Paste image URL here..." 
            value={profile.avatar_url} 
            onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })} 
            className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-4 md:col-span-2">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
            <div className="mt-1">{user?.email}</div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Full name</label>
            <input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} className="mt-1 w-full border border-border bg-background px-4 py-2" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Phone</label>
            <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="mt-1 w-full border border-border bg-background px-4 py-2" />
          </div>
          <button onClick={save} className="bg-foreground px-6 py-2 text-sm uppercase tracking-widest text-background">Save</button>
          {isAdmin && <Link to="/admin" className="ml-3 inline-block border border-foreground px-6 py-2 text-sm uppercase tracking-widest">Admin dashboard</Link>}
        </div>
      </div>

      <div className="mt-16">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl">Recent orders</h2>
          <Link to="/account/orders" className="text-sm uppercase tracking-widest text-accent">View all</Link>
        </div>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {orders.length === 0 ? <div className="py-8 text-center text-muted-foreground">No orders yet.</div> : orders.map((o) => (
            <div key={o.id} className="flex items-center justify-between py-4">
              <div>
                <div className="font-medium">#{o.order_number}</div>
                <div className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="text-sm">{ORDER_STATUS_LABELS[o.status] || o.status}</div>
              <div>{formatINR(o.total)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
