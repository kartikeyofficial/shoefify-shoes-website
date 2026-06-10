import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { formatINR } from "@/lib/site";
import { getAdminStats } from "@/lib/admin.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, pendingOrders: 0, revenue: 0, messages: 0 });
  const getStatsFn = useServerFn(getAdminStats);

  useEffect(() => {
    getStatsFn().then(setStats).catch(console.error);
  }, []);

  const cards = [
    { label: "Total products", value: stats.products },
    { label: "Total orders", value: stats.orders },
    { label: "Pending orders", value: stats.pendingOrders },
    { label: "Revenue (paid)", value: formatINR(stats.revenue) },
    { label: "New messages", value: stats.messages },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <div key={c.label} className="border border-border bg-secondary/40 p-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
          <div className="mt-3 font-display text-4xl">{c.value}</div>
        </div>
      ))}
    </div>
  );
}
