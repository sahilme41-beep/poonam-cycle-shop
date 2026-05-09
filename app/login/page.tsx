"use client";

import { FormEvent, useState } from "react";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    const { signIn } = await import("next-auth/react");
    await signIn("credentials", { email, password, callbackUrl: "/admin" });
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <form onSubmit={submit} className="space-y-3 rounded-xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <input type="email" className="w-full rounded border p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full rounded border p-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded bg-green-600 py-2 text-white">Login</button>
      </form>
    </div>
  );
}
