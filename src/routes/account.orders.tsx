import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { formatINR, ORDER_STATUS_LABELS } from "@/lib/site";
import { getMyOrders } from "@/lib/order.functions";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/account/orders")({
  head: () => ({ meta: [{ title: "My orders — Shoefify" }] }),
  component: OrdersPage,
});

interface Order { id: string; order_number: string; total: number; status: string; payment_status: string; payment_method: string; createdAt: string; tracking_note: string | null; shipping_address: any; items: any[]; }

const STAGES = ["pending", "packed", "shipped", "out_for_delivery", "delivered"];

function OrdersPage() {
  const nav = useNavigate();
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const getOrders = useServerFn(getMyOrders);

  useEffect(() => { if (!loading && !user) nav({ to: "/login" }); }, [user, loading, nav]);

  useEffect(() => {
    if (!user) return;
    getOrders()
      .then((data) => setOrders(data as any))
      .catch((e: any) => toast.error(e.message || "Failed to load orders"));
  }, [user]);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-display text-5xl">My orders</h1>
      <div className="mt-10 space-y-6">
        {orders.length === 0 ? <div className="rounded border border-dashed border-border p-12 text-center text-muted-foreground">You haven't placed any orders yet.</div> : orders.map((o) => {
          const stageIdx = STAGES.indexOf(o.status);
          return (
            <div key={o.id} className="border border-border p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Order #{o.order_number}</div>
                  <div className="mt-1 text-sm">{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatINR(o.total)}</div>
                  <div className="text-xs text-muted-foreground">{o.payment_method === "cod" ? "Cash on Delivery" : "Online"} · {o.payment_status.replace(/_/g, " ")}</div>
                  <Link to="/order/$orderNumber" params={{ orderNumber: o.order_number }} className="mt-2 inline-block text-xs underline">View details →</Link>
                </div>
              </div>

              {o.status !== "cancelled" && (
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    {STAGES.map((s, i) => (
                      <div key={s} className="flex flex-1 flex-col items-center">
                        <div className={`size-3 rounded-full ${i <= stageIdx ? "bg-accent" : "bg-border"}`} />
                        <div className="mt-2 text-[10px] uppercase tracking-widest">{ORDER_STATUS_LABELS[s]}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-1 h-px w-full bg-border" />
                </div>
              )}

              <div className="mt-4 divide-y divide-border border-t border-border">
                {(o.items ?? []).map((i: any, idx: number) => (
                  <div key={idx} className="flex justify-between py-2 text-sm">
                    <span>{i.product_name} {i.size && <span className="text-muted-foreground">· {i.size}</span>} × {i.quantity}</span>
                    <span>{formatINR(i.price * i.quantity)}</span>
                  </div>
                ))}
              </div>
              {o.tracking_note && <div className="mt-3 text-xs text-muted-foreground">Note: {o.tracking_note}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
