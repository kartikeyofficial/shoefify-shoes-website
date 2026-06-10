import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useCart } from "@/lib/cart-store";
import { useAuth } from "@/lib/auth-context";
import { formatINR } from "@/lib/site";
import { toast } from "sonner";
import { createOrder } from "@/lib/order.functions";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/lib/razorpay.functions";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Shoefify" }] }),
  component: CheckoutPage,
});

declare global {
  interface Window {
    Razorpay?: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

function CheckoutPage() {
  const nav = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { items, total, clear } = useCart();
  const createRzp = useServerFn(createRazorpayOrder);
  const verifyRzp = useServerFn(verifyRazorpayPayment);
  const createOrderFn = useServerFn(createOrder);
  const [form, setForm] = useState({ full_name: "", phone: "", line1: "", city: "", state: "", pincode: "" });
  const [method, setMethod] = useState<"razorpay" | "cod">("razorpay");
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) nav({ to: "/login" });
  }, [user, authLoading, nav]);

  useEffect(() => {
    if (user) {
      setForm((f) => ({ ...f, full_name: user.email.split("@")[0] || "", phone: "" }));
    }
  }, [user]);

  if (items.length === 0) {
    return <div className="mx-auto max-w-md px-5 py-32 text-center"><h1 className="font-display text-3xl">Your bag is empty</h1></div>;
  }

  const place = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!form.full_name || !form.phone || !form.line1 || !form.city || !form.state || !form.pincode) {
      return toast.error("Please fill all address fields.");
    }
    setPlacing(true);

    const totalAmount = total();
    
    const orderItems = items.map((i) => ({
      product_id: i.productId,
      product_name: i.name,
      size: i.size,
      quantity: i.qty,
      price: i.price,
    }));

    try {
      const order = await createOrderFn({ data: {
        total: totalAmount,
        shipping_address: form,
        items: orderItems,
        payment_method: method,
      }});

      if (method === "cod") {
        clear();
        setPlacing(false);
        toast.success(`Order ${order.order_number} placed.`);
        nav({ to: "/order/$orderNumber", params: { orderNumber: order.order_number } });
        return;
      }

      // Razorpay online flow
      const ok = await loadRazorpayScript();
      if (!ok) throw new Error("Could not load Razorpay");

      const rzpOrder = await createRzp({ data: { orderId: order.id } });

      const rzp = new window.Razorpay({
        key: rzpOrder.keyId,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        order_id: rzpOrder.razorpayOrderId,
        name: "Shoefify",
        description: `Order ${rzpOrder.orderNumber}`,
        prefill: { name: form.full_name, contact: form.phone, email: user.email ?? "" },
        theme: { color: "#000000" },
        handler: async (resp: any) => {
          try {
            await verifyRzp({
              data: {
                orderId: order.id,
                razorpayOrderId: resp.razorpay_order_id,
                razorpayPaymentId: resp.razorpay_payment_id,
                razorpaySignature: resp.razorpay_signature,
              },
            });
            clear();
            toast.success("Payment successful");
            nav({ to: "/order/$orderNumber", params: { orderNumber: order.order_number } });
          } catch (err: any) {
            toast.error(err?.message ?? "Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => {
            setPlacing(false);
            toast.message("Payment cancelled. You can retry from your orders.");
          },
        },
      });
      rzp.on("payment.failed", () => toast.error("Payment failed. Please try again."));
      rzp.open();
    } catch (err: any) {
      setPlacing(false);
      toast.error(err?.message ?? "Could not start payment");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-display text-5xl">Checkout</h1>
      <form onSubmit={place} className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div>
            <div className="text-xs uppercase tracking-widest">Shipping address</div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <input required placeholder="Full name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="col-span-2 border border-border bg-background px-4 py-3 text-sm" />
              <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="col-span-2 border border-border bg-background px-4 py-3 text-sm" />
              <input required placeholder="Address" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} className="col-span-2 border border-border bg-background px-4 py-3 text-sm" />
              <input required placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="border border-border bg-background px-4 py-3 text-sm" />
              <input required placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="border border-border bg-background px-4 py-3 text-sm" />
              <input required placeholder="PIN code" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="border border-border bg-background px-4 py-3 text-sm" />
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest">Payment method</div>
            <div className="mt-4 space-y-3">
              <label className={`flex cursor-pointer items-start gap-3 border p-4 ${method === "razorpay" ? "border-foreground" : "border-border"}`}>
                <input type="radio" checked={method === "razorpay"} onChange={() => setMethod("razorpay")} />
                <div>
                  <div className="font-medium">Pay online (UPI / Cards / Netbanking)</div>
                  <div className="text-xs text-muted-foreground">Secure payment via Razorpay. The amount is locked to your order total.</div>
                </div>
              </label>
              <label className={`flex cursor-pointer items-start gap-3 border p-4 ${method === "cod" ? "border-foreground" : "border-border"}`}>
                <input type="radio" checked={method === "cod"} onChange={() => setMethod("cod")} />
                <div>
                  <div className="font-medium">Cash on Delivery</div>
                  <div className="text-xs text-muted-foreground">Pay in cash when your order arrives.</div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="h-fit border border-border p-6">
          <div className="text-xs uppercase tracking-widest">Order summary</div>
          <div className="mt-4 space-y-2 text-sm">
            {items.map((i) => (
              <div key={`${i.productId}-${i.variantId}`} className="flex justify-between gap-2">
                <span className="truncate">{i.name} × {i.qty}</span>
                <span>{formatINR(i.price * i.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-lg"><span>Total</span><span>{formatINR(total())}</span></div>
          <button disabled={placing} className="mt-6 w-full bg-foreground py-3 text-sm uppercase tracking-widest text-background disabled:opacity-50">{placing ? "Processing…" : method === "cod" ? "Place order" : "Pay now"}</button>
        </div>
      </form>
    </div>
  );
}
