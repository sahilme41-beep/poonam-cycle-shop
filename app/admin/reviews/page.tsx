"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/reviews");
    setReviews(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rating, message })
    });
    if (!res.ok) { toast.error("Failed to add review"); return; }
    toast.success("Review added");
    setName("");
    setRating(5);
    setMessage("");
    load();
  }

  async function remove(id: string, reviewName: string) {
    if (!confirm(`Delete review by "${reviewName}"?`)) return;
    const res = await fetch("/api/reviews", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (!res.ok) { toast.error("Delete failed"); return; }
    toast.success("Review deleted");
    load();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">Admin</p>
          <h1 className="text-2xl font-extrabold text-brand-ink">Manage Reviews</h1>
          <p className="mt-1 text-xs text-slate-500">Reviews appear on the homepage. Add real customer reviews here.</p>
        </div>
        <a href="/admin" className="rounded-lg border border-green-200 px-4 py-2 text-sm font-medium text-brand-green hover:bg-brand-greenlight">← Dashboard</a>
      </div>
      <form onSubmit={submit} className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm space-y-3">
        <p className="font-bold text-brand-ink">➕ Add Review</p>
        <input required className="w-full rounded-xl border border-green-200 p-2.5 text-sm focus:border-brand-green focus:outline-none" placeholder="Customer name" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-slate-600">Rating:</label>
          {[1,2,3,4,5].map((s) => (
            <button key={s} type="button" onClick={() => setRating(s)}
              className={`text-2xl ${s <= rating ? "text-amber-400" : "text-slate-200"}`}>★</button>
          ))}
        </div>
        <textarea required className="w-full rounded-xl border border-green-200 p-2.5 text-sm focus:border-brand-green focus:outline-none" rows={3} placeholder="Customer message / review" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="w-full rounded-xl bg-brand-green py-2.5 font-bold text-white hover:bg-brand-green2">Add Review</button>
      </form>
      <div className="mt-5 space-y-3">
        {reviews.length === 0 && <p className="rounded-xl border border-green-100 bg-white p-5 text-center text-sm text-slate-400">No reviews yet. Add one above.</p>}
        {reviews.map((r) => (
          <div key={r._id} className="flex items-start justify-between gap-3 rounded-2xl border border-green-100 bg-white p-4 shadow-sm">
            <div>
              <div className="flex gap-0.5 text-amber-400">{[1,2,3,4,5].map((s) => <span key={s}>{s <= r.rating ? "★" : "☆"}</span>)}</div>
              <p className="mt-1 font-semibold text-brand-ink">{r.name}</p>
              <p className="mt-1 text-sm text-slate-600">{r.message}</p>
            </div>
            <button onClick={() => remove(r._id, r.name)} className="shrink-0 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
