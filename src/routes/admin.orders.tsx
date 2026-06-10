import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatINR, ORDER_STATUS_LABELS } from "@/lib/site";
import { getAdminOrders, updateOrderStatus } from "@/lib/order.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

interface Order { id: string; order_number: string; user_id: string; total: number; status: string; payment_method: string; payment_status: string; shipping_address: any; createdAt: string; tracking_note: string | null; items: any[]; }

const STATUSES = ["pending", "packed", "shipped", "out_for_delivery", "delivered", "cancelled"];
const PAY_STATUSES = ["pending", "paid", "failed", "refunded", "cod_pending", "awaiting_manual_verification"];

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const getAdminOrdersFn = useServerFn(getAdminOrders);
  const updateOrderStatusFn = useServerFn(updateOrderStatus);

  const load = async () => {
    try {
      const data = await getAdminOrdersFn();
      setOrders(data as any);
    } catch (e: any) {
      toast.error(e.message || "Failed to load orders");
    }
  };
  useEffect(() => { load(); }, []);

  const update = async (id: string, patch: any) => {
    try {
      await updateOrderStatusFn({ data: { id, ...patch } });
      toast.success("Updated.");
      load();
    } catch (e: any) {
      toast.error(e.message || "Update failed");
    }
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl">Orders ({orders.length})</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border border-border bg-background px-3 py-2 text-sm">
          <option value="all">All</option>
          {STATUSES.map((s) => <option key={s} value={s}>{ORDER_STATUS_LABELS[s] || s}</option>)}
        </select>
      </div>
      <div className="space-y-3">
        {filtered.map((o) => (
          <div key={o.id} className="border border-border">
            <button onClick={() => setOpen(open === o.id ? null : o.id)} className="flex w-full items-center justify-between p-4 text-left">
              <div>
                <div className="font-medium">#{o.order_number}</div>
                <div className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString()} · {o.shipping_address?.full_name}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-widest">{ORDER_STATUS_LABELS[o.status] || o.status}</span>
                <span>{formatINR(o.total)}</span>
              </div>
            </button>
            {open === o.id && (
              <div className="border-t border-border p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Items</div>
                    <div className="mt-2 divide-y divide-border">
                      {(o.items ?? []).map((i: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-4 py-2 text-sm">
                          {i.image ? (
                            <img src={i.image} alt={i.product_name} className="size-10 object-cover bg-muted" />
                          ) : (
                            <div className="size-10 bg-muted" />
                          )}
                          <div className="flex-1">
                            <div>{i.product_name} {i.size && `· ${i.size}`}</div>
                            <div className="text-xs text-muted-foreground">Qty {i.quantity}</div>
                          </div>
                          <div className="font-medium">{formatINR(i.price * i.quantity)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Shipping</div>
                    <div className="mt-2 text-sm">
                      {o.shipping_address?.full_name}<br />
                      {o.shipping_address?.phone}<br />
                      {o.shipping_address?.line1}<br />
                      {o.shipping_address?.city}, {o.shipping_address?.state} {o.shipping_address?.pincode}
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">Payment: {o.payment_method.toUpperCase()} · {o.payment_status}</div>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 border-t border-border pt-4 md:grid-cols-3">
                  <label className="text-xs">
                    <span className="block uppercase tracking-widest text-muted-foreground">Order status</span>
                    <select value={o.status} onChange={(e) => update(o.id, { status: e.target.value as any })} className="mt-1 w-full border border-border bg-background px-2 py-2 text-sm">
                      {STATUSES.map((s) => <option key={s} value={s}>{ORDER_STATUS_LABELS[s] || s}</option>)}
                    </select>
                  </label>
                  <label className="text-xs">
                    <span className="block uppercase tracking-widest text-muted-foreground">Payment status</span>
                    <select value={o.payment_status} onChange={(e) => update(o.id, { payment_status: e.target.value as any })} className="mt-1 w-full border border-border bg-background px-2 py-2 text-sm">
                      {PAY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                  <label className="text-xs">
                    <span className="block uppercase tracking-widest text-muted-foreground">Tracking note</span>
                    <input defaultValue={o.tracking_note ?? ""} onBlur={(e) => e.target.value !== (o.tracking_note ?? "") && update(o.id, { tracking_note: e.target.value })} className="mt-1 w-full border border-border bg-background px-2 py-2 text-sm" />
                  </label>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <div className="rounded border border-dashed border-border p-12 text-center text-muted-foreground">No orders.</div>}
      </div>
    </div>
  );
}
