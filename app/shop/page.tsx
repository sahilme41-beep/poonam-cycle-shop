import ProductCard from "@/components/ProductCard";
import { getStoreProducts } from "@/lib/storefront";
import { STORE_CATEGORIES } from "@/lib/constants";
import ShopSearchBar from "./SearchBar";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop | Poonam Cycle & Toy World",
  description: "Browse all cycles, electric ride-ons, kids cars, and toys in Kolhapur."
};

export default async function ShopPage({
  searchParams
}: {
  searchParams: { q?: string; category?: string; sort?: string; page?: string; min?: string; max?: string; stock?: string };
}) {
  let products: any[] = await getStoreProducts();

  const q = (searchParams.q || "").toLowerCase();
  const min = Number(searchParams.min || 0);
  const max = Number(searchParams.max || 0);
  const page = Number(searchParams.page || 1);
  const limit = 12;

  if (q) products = products.filter((p: any) => p.name.toLowerCase().includes(q) || (p.category || "").toLowerCase().includes(q));
  if (searchParams.category) products = products.filter((p: any) => p.category === searchParams.category);
  if (min > 0) products = products.filter((p: any) => p.price >= min);
  if (max > 0) products = products.filter((p: any) => p.price <= max);
  if (searchParams.stock === "in") products = products.filter((p: any) => p.stock > 0);
  if (searchParams.sort === "price_asc") products.sort((a: any, b: any) => a.price - b.price);
  if (searchParams.sort === "price_desc") products.sort((a: any, b: any) => b.price - a.price);

  const totalPages = Math.max(1, Math.ceil(products.length / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const pagedProducts = products.slice((safePage - 1) * limit, safePage * limit);

  const baseQuery = new URLSearchParams();
  if (searchParams.q) baseQuery.set("q", searchParams.q);
  if (searchParams.category) baseQuery.set("category", searchParams.category);
  if (searchParams.sort) baseQuery.set("sort", searchParams.sort);
  if (searchParams.min) baseQuery.set("min", searchParams.min);
  if (searchParams.max) baseQuery.set("max", searchParams.max);
  if (searchParams.stock) baseQuery.set("stock", searchParams.stock);

  const activeCategory = searchParams.category || "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">Our Products</p>
          <h1 className="text-3xl font-extrabold text-brand-ink">Shop All Products</h1>
          <p className="mt-1 text-sm text-slate-500">{products.length} product{products.length !== 1 ? "s" : ""} found</p>
        </div>
        <ShopSearchBar defaultValue={searchParams.q || ""} />
      </div>

      {/* Category tabs */}
      <div className="mb-5 flex flex-wrap gap-2 text-sm">
        <a
          href="/shop"
          className={`rounded-full border px-4 py-1.5 font-medium transition ${!activeCategory ? "border-brand-green bg-brand-green text-white" : "border-green-200 bg-white text-slate-600 hover:border-brand-green hover:text-brand-green"}`}
        >
          All
        </a>
        {STORE_CATEGORIES.map((cat) => (
          <a
            key={cat.slug}
            href={`/shop?category=${encodeURIComponent(cat.name)}`}
            className={`rounded-full border px-4 py-1.5 font-medium transition ${activeCategory === cat.name ? "border-brand-green bg-brand-green text-white" : "border-green-200 bg-white text-slate-600 hover:border-brand-green hover:text-brand-green"}`}
          >
            {cat.name}
          </a>
        ))}
      </div>

      {/* Sort & filter pills */}
      <div className="mb-6 flex flex-wrap gap-2 text-sm">
        <a className={`rounded-full border px-3 py-1.5 transition ${searchParams.stock === "in" ? "border-brand-green bg-brand-green text-white" : "border-green-100 bg-brand-greenlight text-brand-green hover:bg-green-100"}`} href="/shop?stock=in">✓ In Stock</a>
        <a className={`rounded-full border px-3 py-1.5 transition ${searchParams.sort === "price_asc" ? "border-brand-green bg-brand-green text-white" : "border-green-100 bg-brand-greenlight text-brand-green hover:bg-green-100"}`} href="/shop?sort=price_asc">Price: Low → High</a>
        <a className={`rounded-full border px-3 py-1.5 transition ${searchParams.sort === "price_desc" ? "border-brand-green bg-brand-green text-white" : "border-green-100 bg-brand-greenlight text-brand-green hover:bg-green-100"}`} href="/shop?sort=price_desc">Price: High → Low</a>
        <a className="rounded-full border border-green-100 bg-brand-greenlight px-3 py-1.5 text-brand-green hover:bg-green-100" href="/shop?min=5000&max=20000">₹5k – ₹20k</a>
        <a className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-500 hover:bg-slate-50" href="/shop">✕ Reset</a>
      </div>

      {/* Product grid */}
      {pagedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {pagedProducts.map((p: any) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl">🔍</div>
          <p className="mt-4 text-xl font-bold text-brand-ink">No products found</p>
          <p className="mt-1 text-slate-500">Try adjusting your search or filters</p>
          <a href="/shop" className="mt-5 rounded-xl bg-brand-green px-6 py-2.5 font-semibold text-white hover:bg-brand-green2">Clear Filters</a>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <a
            className={`rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:border-brand-green hover:text-brand-green ${safePage <= 1 ? "pointer-events-none opacity-40" : ""}`}
            href={`/shop?${new URLSearchParams({ ...Object.fromEntries(baseQuery.entries()), page: String(safePage - 1) }).toString()}`}
          >
            ← Prev
          </a>
          <span className="rounded-xl bg-brand-green px-4 py-2 text-sm font-bold text-white">
            {safePage} / {totalPages}
          </span>
          <a
            className={`rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:border-brand-green hover:text-brand-green ${safePage >= totalPages ? "pointer-events-none opacity-40" : ""}`}
            href={`/shop?${new URLSearchParams({ ...Object.fromEntries(baseQuery.entries()), page: String(safePage + 1) }).toString()}`}
          >
            Next →
          </a>
        </div>
      )}
    </div>
  );
}
