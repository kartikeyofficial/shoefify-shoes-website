import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Shoefify" }, { name: "description", content: "Get in touch with the Shoefify team." }] }),
  component: () => (
    <div className="mx-auto max-w-2xl px-5 py-20">
      <h1 className="font-display text-5xl">Contact</h1>
      <div className="mt-8 space-y-3 text-lg">
        <div><span className="text-muted-foreground">Email — </span><a href={`mailto:${SITE.email}`} className="text-accent">{SITE.email}</a></div>
        <div><span className="text-muted-foreground">Web — </span>{SITE.domain}</div>
      </div>
      <p className="mt-8 text-sm text-muted-foreground">For questions, suggestions or order help, also try the <a href="/help" className="text-accent">Help & feedback</a> page.</p>
    </div>
  ),
});
