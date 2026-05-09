"use client";

const sections = [
  {
    href: "/admin/products",
    icon: "📦",
    title: "Products",
    desc: "Add, edit, delete products. Upload images, set price, stock, variants, features & specs."
  },
  {
    href: "/admin/categories",
    icon: "🗂️",
    title: "Categories",
    desc: "Manage store categories and subcategories. Reorder them as needed."
  },
  {
    href: "/admin/settings",
    icon: "⚙️",
    title: "Site Settings",
    desc: "Update announcement bar text, home banner slider images, and category card images."
  },
  {
    href: "/admin/reviews",
    icon: "⭐",
    title: "Reviews",
    desc: "Add and delete customer reviews shown on the homepage."
  }
];

export default function AdminDashboard() {
  async function seedData() {
    if (!confirm("This will seed starter data. Continue?")) return;
    await fetch("/api/seed", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">Admin Panel</p>
          <h1 className="text-3xl font-extrabold text-brand-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your store from here. All changes go live immediately.</p>
        </div>
        <a href="/" className="rounded-lg border border-green-200 px-4 py-2 text-sm font-medium text-brand-green hover:bg-brand-greenlight">
          ← View Site
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {sections.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="group flex items-start gap-4 rounded-2xl border border-green-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-green hover:shadow-md"
          >
            <span className="text-4xl">{s.icon}</span>
            <div>
              <p className="text-lg font-bold text-brand-ink group-hover:text-brand-green">{s.title}</p>
              <p className="mt-1 text-sm text-slate-500">{s.desc}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
        <p className="font-semibold text-yellow-800">⚠️ Seed Starter Data</p>
        <p className="mt-1 text-sm text-yellow-700">Only use this to populate initial sample products. Do not run if you already have real products.</p>
        <button
          onClick={seedData}
          className="mt-3 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600"
        >
          Seed Data
        </button>
      </div>
    </div>
  );
}
