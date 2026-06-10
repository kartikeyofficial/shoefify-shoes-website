import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getMessages, updateMessage } from "@/lib/message.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
});

interface Msg { id: string; name: string; email: string; subject: string; message: string; type: string; status: string; createdAt: string; admin_response: string | null; }

const STATUSES = ["new", "in_review", "resolved"];

function AdminMessages() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const getMessagesFn = useServerFn(getMessages);
  const updateMessageFn = useServerFn(updateMessage);

  const load = () => getMessagesFn().then((data) => setMsgs(data as any)).catch((e: any) => toast.error(e.message || "Failed to load messages"));
  useEffect(() => { load(); }, []);

  const update = async (id: string, patch: any) => {
    try {
      await updateMessageFn({ data: { id, ...patch } });
      load();
    } catch (e: any) {
      toast.error(e.message || "Failed to update message");
    }
  };

  return (
    <div>
      <h2 className="font-display text-2xl">Messages ({msgs.length})</h2>
      <div className="mt-6 space-y-2">
        {msgs.map((m) => (
          <div key={m.id} className="border border-border">
            <button onClick={() => setOpen(open === m.id ? null : m.id)} className="flex w-full items-center justify-between p-4 text-left">
              <div>
                <div className="text-xs uppercase tracking-widest text-accent">{m.type} · {m.status}</div>
                <div className="mt-1 font-medium">{m.subject}</div>
                <div className="text-xs text-muted-foreground">{m.name} · {m.email} · {new Date(m.createdAt).toLocaleString()}</div>
              </div>
            </button>
            {open === m.id && (
              <div className="border-t border-border p-4">
                <p className="text-sm whitespace-pre-wrap">{m.message}</p>
                <div className="mt-4 flex gap-2">
                  {STATUSES.map((s) => (
                    <button key={s} onClick={() => update(m.id, { status: s })} className={`border px-3 py-1 text-xs uppercase tracking-widest ${m.status === s ? "border-foreground bg-foreground text-background" : "border-border"}`}>{s}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {msgs.length === 0 && <div className="rounded border border-dashed border-border p-12 text-center text-muted-foreground">No messages yet.</div>}
      </div>
    </div>
  );
}
