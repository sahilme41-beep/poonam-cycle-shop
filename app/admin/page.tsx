"use client";

export default function AdminDashboard() {
  async function seedData() {
    await fetch("/api/seed", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <button onClick={seedData} className="mt-3 rounded bg-green-600 px-4 py-2 text-white">
        Seed Starter Data
      </button>
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        <a href="/admin/products" className="rounded-xl bg-white p-4 shadow-sm">Products</a>
        <a href="/admin/categories" className="rounded-xl bg-white p-4 shadow-sm">Categories</a>
        <a href="/admin/settings" className="rounded-xl bg-white p-4 shadow-sm">Settings</a>
        <a href="/admin/reviews" className="rounded-xl bg-white p-4 shadow-sm">Reviews</a>
      </div>
    </div>
  );
}
