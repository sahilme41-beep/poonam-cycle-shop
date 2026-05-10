"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { signIn } = await import("next-auth/react");
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/admin",
        redirect: false
      });
      if (res?.error) {
        setError("Invalid email or password. Please try again.");
      } else if (res?.url) {
        window.location.href = res.url;
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center">
          <Image src="/logo.png" alt="Poonam Cycle & Toy World" width={180} height={68} className="h-16 w-auto" />
          <p className="mt-3 text-sm text-slate-500">Admin Portal</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-green-100 bg-white p-6 shadow-md space-y-4">
          <div>
            <p className="mb-1 text-center text-xs font-semibold uppercase tracking-widest text-brand-green">Secure Login</p>
            <h1 className="text-center text-2xl font-extrabold text-brand-ink">Welcome Back</h1>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              required
              type="email"
              autoComplete="email"
              className="w-full rounded-xl border border-green-200 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input
              required
              type="password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-green-200 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-green py-3 font-bold text-white hover:bg-brand-green2 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-400">
          This portal is for store admins only.
        </p>
      </div>
    </div>
  );
}
