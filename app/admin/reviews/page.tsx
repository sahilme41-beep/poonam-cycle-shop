"use client";

import { FormEvent, useEffect, useState } from "react";

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
    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rating, message })
    });
    setName("");
    setRating(5);
    setMessage("");
    load();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Manage Reviews</h1>
      <form onSubmit={submit} className="mt-4 space-y-2 rounded bg-white p-4 shadow-sm">
        <input className="w-full rounded border p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full rounded border p-2" type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} />
        <textarea className="w-full rounded border p-2" rows={4} placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="rounded bg-green-600 px-3 py-2 text-white">Add Review</button>
      </form>
      <div className="mt-4 rounded bg-white p-4 shadow-sm">
        {reviews.map((r) => (
          <div key={r._id} className="border-b py-2">
            <p className="font-medium">{r.name} | {r.rating}/5</p>
            <p className="text-sm text-slate-600">{r.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
