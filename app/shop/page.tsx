import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Shop | Poonam Cycle & Toy World",
  description: "Browse all cycle and toy products"
};

export default async function ShopPage({
  searchParams
}: {
  searchParams: { q?: string; category?: string; sort?: string; page?: string; min?: string; max?: string; stock?: string };
}) {
  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/products`, { cache: "no-store" });
  let products = await res.json();

  const q = (searchParams.q || "").toLowerCase();
  const min = Number(searchParams.min || 0);
  const max = Number(searchParams.max || 0);
  const page = Number(searchParams.page || 1);
  const limit = 12;

  if (q) products = products.filter((p: any) => p.name.toLowerCase().includes(q));
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Shop</h1>
      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        <a className="rounded border px-3 py-1" href="/shop?stock=in">In Stock</a>
        <a className="rounded border px-3 py-1" href="/shop?sort=price_asc">Price Low to High</a>
        <a className="rounded border px-3 py-1" href="/shop?sort=price_desc">Price High to Low</a>
        <a className="rounded border px-3 py-1" href="/shop?min=5000&max=20000">Rs 5k - 20k</a>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {pagedProducts.map((p: any) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-2">
        <a
          className={`rounded border px-3 py-1 ${safePage <= 1 ? "pointer-events-none opacity-40" : ""}`}
          href={`/shop?${new URLSearchParams({ ...Object.fromEntries(baseQuery.entries()), page: String(safePage - 1) }).toString()}`}
        >
          Prev
        </a>
        <span className="text-sm">
          Page {safePage} of {totalPages}
        </span>
        <a
          className={`rounded border px-3 py-1 ${safePage >= totalPages ? "pointer-events-none opacity-40" : ""}`}
          href={`/shop?${new URLSearchParams({ ...Object.fromEntries(baseQuery.entries()), page: String(safePage + 1) }).toString()}`}
        >
          Next
        </a>
      </div>
    </div>
  );
}
