import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./useServerFn-DL2oePlL.mjs";
import { u as useAuth, a as useCart, f as formatINR, c as createSsrRpc } from "./router-CHbF3jR6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as createOrder } from "./order.functions-DttxRx8H.mjs";
import { c as createServerFn } from "./server-N1mLFSER.mjs";
import "../_libs/seroval.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zustand.mjs";
import "../_libs/lucide-react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
createServerFn({
  method: "GET"
}).handler(createSsrRpc("cb689f3d061cfb052139f5bf15f608371ea7bcd6aa63226ef5b96d12eef1c639"));
const createRazorpayOrder = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  orderId: stringType()
}).parse(input)).handler(createSsrRpc("a6f1a7df2dd032270b33ae7f01da2576971e1b7652c3d182f28f0f762ce126d4"));
const verifyRazorpayPayment = createServerFn({
  method: "POST"
}).inputValidator((input) => objectType({
  orderId: stringType(),
  razorpayOrderId: stringType().min(1),
  razorpayPaymentId: stringType().min(1),
  razorpaySignature: stringType().min(1)
}).parse(input)).handler(createSsrRpc("5e2c6a85ce8b9f3a92cd9b0a9b4d8f015d9ec2fa0b30eb31f8605ecef9f67199"));
function loadRazorpayScript() {
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
  const {
    user,
    loading: authLoading
  } = useAuth();
  const {
    items,
    total,
    clear
  } = useCart();
  const createRzp = useServerFn(createRazorpayOrder);
  const verifyRzp = useServerFn(verifyRazorpayPayment);
  const createOrderFn = useServerFn(createOrder);
  const [form, setForm] = reactExports.useState({
    full_name: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [method, setMethod] = reactExports.useState("razorpay");
  const [placing, setPlacing] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!authLoading && !user) nav({
      to: "/login"
    });
  }, [user, authLoading, nav]);
  reactExports.useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        full_name: user.email.split("@")[0] || "",
        phone: ""
      }));
    }
  }, [user]);
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-md px-5 py-32 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Your bag is empty" }) });
  }
  const place = async (e) => {
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
      price: i.price
    }));
    try {
      const order = await createOrderFn({
        data: {
          total: totalAmount,
          shipping_address: form,
          items: orderItems,
          payment_method: method
        }
      });
      if (method === "cod") {
        clear();
        setPlacing(false);
        toast.success(`Order ${order.order_number} placed.`);
        nav({
          to: "/order/$orderNumber",
          params: {
            orderNumber: order.order_number
          }
        });
        return;
      }
      const ok = await loadRazorpayScript();
      if (!ok) throw new Error("Could not load Razorpay");
      const rzpOrder = await createRzp({
        data: {
          orderId: order.id
        }
      });
      const rzp = new window.Razorpay({
        key: rzpOrder.keyId,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        order_id: rzpOrder.razorpayOrderId,
        name: "Shoefify",
        description: `Order ${rzpOrder.orderNumber}`,
        prefill: {
          name: form.full_name,
          contact: form.phone,
          email: user.email ?? ""
        },
        theme: {
          color: "#000000"
        },
        handler: async (resp) => {
          try {
            await verifyRzp({
              data: {
                orderId: order.id,
                razorpayOrderId: resp.razorpay_order_id,
                razorpayPaymentId: resp.razorpay_payment_id,
                razorpaySignature: resp.razorpay_signature
              }
            });
            clear();
            toast.success("Payment successful");
            nav({
              to: "/order/$orderNumber",
              params: {
                orderNumber: order.order_number
              }
            });
          } catch (err) {
            toast.error(err?.message ?? "Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => {
            setPlacing(false);
            toast.message("Payment cancelled. You can retry from your orders.");
          }
        }
      });
      rzp.on("payment.failed", () => toast.error("Payment failed. Please try again."));
      rzp.open();
    } catch (err) {
      setPlacing(false);
      toast.error(err?.message ?? "Could not start payment");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl", children: "Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: place, className: "mt-10 grid gap-10 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest", children: "Shipping address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, placeholder: "Full name", value: form.full_name, onChange: (e) => setForm({
              ...form,
              full_name: e.target.value
            }), className: "col-span-2 border border-border bg-background px-4 py-3 text-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, placeholder: "Phone", value: form.phone, onChange: (e) => setForm({
              ...form,
              phone: e.target.value
            }), className: "col-span-2 border border-border bg-background px-4 py-3 text-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, placeholder: "Address", value: form.line1, onChange: (e) => setForm({
              ...form,
              line1: e.target.value
            }), className: "col-span-2 border border-border bg-background px-4 py-3 text-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, placeholder: "City", value: form.city, onChange: (e) => setForm({
              ...form,
              city: e.target.value
            }), className: "border border-border bg-background px-4 py-3 text-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, placeholder: "State", value: form.state, onChange: (e) => setForm({
              ...form,
              state: e.target.value
            }), className: "border border-border bg-background px-4 py-3 text-sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, placeholder: "PIN code", value: form.pincode, onChange: (e) => setForm({
              ...form,
              pincode: e.target.value
            }), className: "border border-border bg-background px-4 py-3 text-sm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest", children: "Payment method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex cursor-pointer items-start gap-3 border p-4 ${method === "razorpay" ? "border-foreground" : "border-border"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", checked: method === "razorpay", onChange: () => setMethod("razorpay") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "Pay online (UPI / Cards / Netbanking)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Secure payment via Razorpay. The amount is locked to your order total." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex cursor-pointer items-start gap-3 border p-4 ${method === "cod" ? "border-foreground" : "border-border"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", checked: method === "cod", onChange: () => setMethod("cod") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: "Cash on Delivery" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Pay in cash when your order arrives." })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-fit border border-border p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest", children: "Order summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2 text-sm", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
            i.name,
            " × ",
            i.qty
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(i.price * i.qty) })
        ] }, `${i.productId}-${i.variantId}`)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-between border-t border-border pt-4 text-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatINR(total()) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: placing, className: "mt-6 w-full bg-foreground py-3 text-sm uppercase tracking-widest text-background disabled:opacity-50", children: placing ? "Processing…" : method === "cod" ? "Place order" : "Pay now" })
      ] })
    ] })
  ] });
}
export {
  CheckoutPage as component
};
