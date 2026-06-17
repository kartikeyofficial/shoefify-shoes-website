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

interface Order { id: string; order_number: string; total: number; status: string; payment_status: string; payment_method: string; createdAt: string; estimated_delivery_date?: string | null; tracking_note: string | null; shipping_address: any; items: any[]; }

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
          const placed = new Date(o.createdAt);
          const eta = o.estimated_delivery_date ? new Date(o.estimated_delivery_date) : null;
          
          return (
            <div key={o.id} className="border border-border p-6 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
                <div>
                  <h2 className="font-display text-3xl">Order #{o.order_number}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Payment status: {o.payment_status.replace(/_/g, " ")}</p>
                </div>
                <Link to="/order/$orderNumber" params={{ orderNumber: o.order_number }} className="border border-border px-4 py-2 text-xs uppercase tracking-widest hover:bg-muted">
                  View details
                </Link>
              </div>

              {o.status !== "cancelled" && (
                <div className="mt-8">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Tracking</div>
                  <div className="relative mt-6">
                    <div className="absolute left-0 right-0 top-3 h-0.5 bg-border" />
                    <div
                      className="absolute left-0 top-3 h-0.5 bg-green-600 transition-all"
                      style={{ width: `${(stageIdx / (STAGES.length - 1)) * 100}%` }}
                    />
                    <div className="relative flex items-start justify-between">
                      {STAGES.map((s, i) => {
                        const done = i <= stageIdx;
                        return (
                          <div key={s} className="flex flex-1 flex-col items-center">
                            <div
                              className={`relative z-10 size-6 rounded-full border-2 ${
                                done ? "border-green-600 bg-green-600" : "border-border bg-background"
                              } flex items-center justify-center`}
                            >
                              {done && <div className="size-2 rounded-full bg-white" />}
                            </div>
                            <div className={`mt-2 text-center text-[10px] uppercase tracking-widest ${done ? "text-foreground" : "text-muted-foreground"}`}>
                              {ORDER_STATUS_LABELS[s]}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-10 grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  <div className="border border-border p-6">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Items</div>
                    <div className="mt-4 divide-y divide-border">
                      {(o.items ?? []).map((i: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-4 py-4">
                          {i.product_slug ? (
                            <Link to="/product/$slug" params={{ slug: i.product_slug }} className="shrink-0 block">
                              {i.image ? (
                                <img src={i.image} alt={i.product_name} className="size-20 object-cover" />
                              ) : (
                                <div className="size-20 bg-muted" />
                              )}
                            </Link>
                          ) : (
                            <div className="shrink-0">
                              {i.image ? (
                                <img src={i.image} alt={i.product_name} className="size-20 object-cover" />
                              ) : (
                                <div className="size-20 bg-muted" />
                              )}
                            </div>
                          )}
                          <div className="flex-1">
                            {i.product_slug ? (
                              <Link to="/product/$slug" params={{ slug: i.product_slug }} className="font-medium hover:underline block">
                                {i.product_name}
                              </Link>
                            ) : (
                              <div className="font-medium">{i.product_name}</div>
                            )}
                            <div className="text-xs text-muted-foreground mt-1">
                              {i.size && <>Size {i.size} · </>}Qty {i.quantity}
                            </div>
                          </div>
                          <div className="text-sm">{formatINR(i.price * i.quantity)}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-border p-6">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Shipping to</div>
                    <div className="mt-3 text-sm leading-relaxed">
                      <div className="font-medium">{o.shipping_address?.full_name}</div>
                      <div>{o.shipping_address?.line1}</div>
                      <div>
                        {o.shipping_address?.city}, {o.shipping_address?.state} {o.shipping_address?.pincode}
                      </div>
                      <div className="text-muted-foreground">Phone: {o.shipping_address?.phone}</div>
                    </div>
                  </div>
                </div>

                <div className="h-fit space-y-6">
                  <div className="border border-border p-6">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Order summary</div>
                    <dl className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between"><dt className="text-muted-foreground">Order #</dt><dd className="font-mono">{o.order_number}</dd></div>
                      <div className="flex justify-between"><dt className="text-muted-foreground">Placed</dt><dd>{placed.toLocaleString()}</dd></div>
                      {eta && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Estimated arrival</dt>
                          <dd className="font-medium">{eta.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })}</dd>
                        </div>
                      )}
                      <div className="flex justify-between"><dt className="text-muted-foreground">Payment</dt><dd>{o.payment_method === "cod" ? "Cash on Delivery" : "Online"}</dd></div>
                    </dl>
                    <div className="mt-4 flex justify-between border-t border-border pt-4 text-lg">
                      <span>Total</span><span>{formatINR(o.total)}</span>
                    </div>
                  </div>
                  {o.tracking_note && <div className="text-xs text-muted-foreground">Note: {o.tracking_note}</div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
