import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { sendOtp as sendOtpFn, verifyOtp as verifyOtpFn } from "@/lib/auth.functions";
import { useAuth } from "@/lib/auth-context";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Shoefify" }, { name: "description", content: "Sign in to Shoefify with email OTP." }] }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  
  const sendOtpServer = useServerFn(sendOtpFn);
  const verifyOtpServer = useServerFn(verifyOtpFn);

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendOtpServer({ data: { email: email.trim().toLowerCase() } });
      setStage("otp");
      toast.success("OTP sent — check your inbox.");
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyOtpServer({ data: { email: email.trim().toLowerCase(), otp: otp.trim() } });
      await auth.refresh(); // Refresh auth context to pick up the new user
      toast.success("Signed in.");
      nav({ to: "/" });
    } catch (error: any) {
      toast.error(error.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <h1 className="font-display text-4xl">Sign in</h1>
      <p className="mt-2 text-sm text-muted-foreground">Use your email — we'll send you a one-time code.</p>
      {stage === "email" ? (
        <form onSubmit={sendOtp} className="mt-8 space-y-4">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full border border-border bg-background px-4 py-3" />
          <button disabled={loading} className="w-full bg-foreground py-3 text-sm uppercase tracking-widest text-background disabled:opacity-50">{loading ? "Sending…" : "Send code"}</button>
        </form>
      ) : (
        <form onSubmit={verify} className="mt-8 space-y-4">
          <input type="text" inputMode="numeric" required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit code" className="w-full border border-border bg-background px-4 py-3 text-center tracking-[0.5em]" maxLength={6} />
          <button disabled={loading} className="w-full bg-foreground py-3 text-sm uppercase tracking-widest text-background disabled:opacity-50">{loading ? "Verifying…" : "Verify & sign in"}</button>
          <button type="button" onClick={() => setStage("email")} className="w-full text-xs text-muted-foreground">Use a different email</button>
        </form>
      )}
      <p className="mt-8 text-sm text-muted-foreground">No account? <Link to="/signup" className="text-accent">Create one</Link></p>
    </div>
  );
}
