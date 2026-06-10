export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const SITE = {
  name: "Shoefify",
  domain: "shoefify.shop",
  email: "shoefify.shop@gmail.com",
  tagline: "Footwear, considered.",
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Confirmed",
  packed: "Packed",
  shipped: "Shipped",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
