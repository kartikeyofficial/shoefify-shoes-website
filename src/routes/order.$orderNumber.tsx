import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { formatINR, ORDER_STATUS_LABELS } from "@/lib/site";
import { getOrder } from "@/lib/order.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/order/$orderNumber")({
  head: () => ({ meta: [{ title: "Order details — Shoefify" }] }),
  component: OrderDetailPage,
});

interface Item {
  id?: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  size: string | null;
  image?: string | null;
}

interface Order {
  id: string;
  order_number: string;
  total: number;
  status: string;
  payment_status: string;
  payment_method: string;
  createdAt: string;
  estimated_delivery_date?: string | null;
  shipping_address: any;
  razorpay_payment_id?: string | null;
  items: Item[];
}

const STAGES = ["pending", "packed", "shipped", "out_for_delivery", "delivered"];

function OrderDetailPage() {
  const { orderNumber } = Route.useParams();
  const nav = useNavigate();
  const { user, loading } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [notFound, setNotFound] = useState(false);
  const getOrderFn = useServerFn(getOrder);

  useEffect(() => {
    if (!loading && !user) nav({ to: "/login" });
  }, [user, loading, nav]);

  useEffect(() => {
    if (!user) return;
    getOrderFn({ data: { order_number: orderNumber } })
      .then((o) => {
        if (!o) {
          setNotFound(true);
          return;
        }
        setOrder(o as any);
        setItems(o.items as any);
      })
      .catch(() => setNotFound(true));
  }, [user, orderNumber]);

  if (notFound) {
    return (
      <div className="mx-auto max-w-md px-5 py-32 text-center">
        <h1 className="font-display text-3xl">Order not found</h1>
        <Link to="/account/orders" className="mt-4 inline-block text-sm underline">
          View my orders
        </Link>
      </div>
    );
  }
  if (!order) return <div className="mx-auto max-w-3xl px-5 py-20 text-sm text-muted-foreground">Loading…</div>;

  const stageIdx = STAGES.indexOf(order.status);
  const placed = new Date(order.createdAt);
  const eta = order.estimated_delivery_date ? new Date(order.estimated_delivery_date) : null;

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      {order.payment_status === "paid" || order.payment_method === "cod" ? (
        <div className="flex flex-col items-center gap-3 border border-accent/30 bg-accent/5 p-8 text-center">
          <CheckCircle2 className="size-12 text-accent" />
          <h1 className="font-display text-4xl">Order confirmed</h1>
          <p className="text-sm text-muted-foreground">
            Thank you! Your order <span className="font-mono">#{order.order_number}</span> has been placed
            {order.payment_method === "cod" ? " — pay on delivery." : " and payment received."}
          </p>
        </div>
      ) : (
        <div className="border border-border p-6">
          <h1 className="font-display text-3xl">Order #{order.order_number}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Payment status: {order.payment_status.replace(/_/g, " ")}</p>
        </div>
      )}

      {/* Tracking timeline */}
      {order.status !== "cancelled" && (
        <div className="mt-10">
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
              {items.map((i, idx) => (
                <div key={idx} className="flex items-center gap-4 py-4">
                  {i.image ? (
                    <img src={i.image} alt={i.product_name} className="size-20 object-cover" />
                  ) : (
                    <div className="size-20 bg-muted" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium">{i.product_name}</div>
                    <div className="text-xs text-muted-foreground">
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
              <div className="font-medium">{order.shipping_address?.full_name}</div>
              <div>{order.shipping_address?.line1}</div>
              <div>
                {order.shipping_address?.city}, {order.shipping_address?.state} {order.shipping_address?.pincode}
              </div>
              <div className="text-muted-foreground">Phone: {order.shipping_address?.phone}</div>
            </div>
          </div>
        </div>

        <div className="h-fit space-y-6">
          <div className="border border-border p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Order summary</div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Order #</dt><dd className="font-mono">{order.order_number}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Placed</dt><dd>{placed.toLocaleString()}</dd></div>
              {eta && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Estimated arrival</dt>
                  <dd className="font-medium">{eta.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })}</dd>
                </div>
              )}
              <div className="flex justify-between"><dt className="text-muted-foreground">Payment</dt><dd>{order.payment_method === "cod" ? "Cash on Delivery" : "Online"}</dd></div>
              {order.razorpay_payment_id && (
                <div className="flex justify-between"><dt className="text-muted-foreground">Payment ID</dt><dd className="font-mono text-xs">{order.razorpay_payment_id}</dd></div>
              )}
            </dl>
            <div className="mt-4 flex justify-between border-t border-border pt-4 text-lg">
              <span>Total</span><span>{formatINR(order.total)}</span>
            </div>
          </div>
          <Link to="/account/orders" className="block border border-border py-3 text-center text-xs uppercase tracking-widest hover:bg-muted">
            All orders
          </Link>
        </div>
      </div>
    </div>
  );
}
