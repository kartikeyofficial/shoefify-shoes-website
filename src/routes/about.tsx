import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Shoefify" }, { name: "description", content: "Shoefify is a considered footwear label. Made to last, made to be worn." }] }),
  component: () => (
    <div className="mx-auto max-w-3xl px-5 py-20">
      <h1 className="font-display text-5xl">About {SITE.name}</h1>
      <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>Shoefify is a footwear label built for the way India walks — through monsoon streets, marble lobbies, festival floors and morning runs. We design pairs you'll keep wearing.</p>
        <p>Every silhouette is developed in small batches with craftspeople we work with directly. We use supple leather, breathable knits, and soles tuned for real distance.</p>
        <p>It's not about more. It's about pairs that hold up.</p>
        <p>~Kumar Kartikey<br />(CEO of Shoefify)</p>
       
      </div>
    </div>
  ),
});
