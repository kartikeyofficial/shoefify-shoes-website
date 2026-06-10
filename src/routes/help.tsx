import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { SITE } from "@/lib/site";
import { createMessage } from "@/lib/message.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help & feedback — Shoefify" }, { name: "description", content: "FAQs, suggestions, and support — get in touch with Shoefify." }] }),
  component: HelpPage,
});

const FAQ = [
  { q: "How long does shipping take?", a: "Orders ship within 1-2 business days and arrive in 3-7 days across India." },
  { q: "What is the return policy?", a: "Easy 7-day returns on unworn items in original packaging." },
  { q: "Which payment methods are accepted?", a: "UPI, cards, netbanking via Razorpay, plus Cash on Delivery." },
  { q: "How do I track my order?", a: "Sign in and visit My Orders to see live status." },
];

function HelpPage() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", type: "question" as "question" | "suggestion" | "report" });
  const [sending, setSending] = useState(false);
  const createMessageFn = useServerFn(createMessage);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await createMessageFn({ data: form });
      toast.success("Thanks — we'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "", type: "question" });
    } catch (error: any) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-display text-5xl">Help & feedback</h1>
      <p className="mt-3 text-muted-foreground">Questions, suggestions or issues — we'd love to hear from you. Or email <a href={`mailto:${SITE.email}`} className="text-accent">{SITE.email}</a>.</p>

      <section className="mt-12">
        <h2 className="font-display text-3xl">FAQs</h2>
        <div className="mt-4 divide-y divide-border border-y border-border">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="cursor-pointer list-none font-medium">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-3xl">Get in touch</h2>
        <form onSubmit={submit} className="mt-6 grid grid-cols-2 gap-3">
          <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border border-border bg-background px-4 py-3 text-sm" />
          <input required type="email" placeholder="Your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border border-border bg-background px-4 py-3 text-sm" />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as any })} className="col-span-2 border border-border bg-background px-4 py-3 text-sm">
            <option value="question">Question</option>
            <option value="suggestion">Suggestion</option>
            <option value="report">Report a problem</option>
          </select>
          <input required placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="col-span-2 border border-border bg-background px-4 py-3 text-sm" />
          <textarea required rows={6} placeholder="Your message…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="col-span-2 border border-border bg-background px-4 py-3 text-sm" />
          <button disabled={sending} className="col-span-2 bg-foreground py-3 text-sm uppercase tracking-widest text-background disabled:opacity-50">{sending ? "Sending…" : "Send message"}</button>
        </form>
      </section>
    </div>
  );
}
