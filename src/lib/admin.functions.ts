import { createServerFn } from "@tanstack/react-start";
import { connectDB } from "./db.server";
import { Product, Order, SupportMessage } from "./models.server";
import { getServerUser } from "./auth.server";
import { serialize } from "./utils";

export const getAdminStats = createServerFn({ method: "GET" }).handler(async () => {
  await connectDB();
  const user = await getServerUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");

  const [productsCount, orders, messagesCount] = await Promise.all([
    Product.countDocuments(),
    Order.find({}, "total status payment_status").lean(),
    SupportMessage.countDocuments({ status: "new" })
  ]);

  return serialize({
    products: productsCount,
    orders: orders.length,
    pendingOrders: orders.filter((o: any) => o.status === "pending").length,
    revenue: orders.filter((o: any) => o.payment_status === "paid").reduce((s: number, o: any) => s + Number(o.total), 0),
    messages: messagesCount
  });
});
