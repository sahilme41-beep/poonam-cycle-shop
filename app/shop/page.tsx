import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Shop | Poonam Cycle & Toy World",
  description: "Browse all cycle and toy products"
};

export default async function ShopPage({
  searchParams
}: {
  searchParams: { q?: string; category?: string; sort?: string };
}) {
  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/products`, { cache: "no-store" });
  let products = await res.json();

  const q = (searchParams.q || "").toLowerCase();
  if (q) products = products.filter((p: any) => p.name.toLowerCase().includes(q));
  if (searchParams.category) products = products.filter((p: any) => p.category === searchParams.category);
  if (searchParams.sort === "price_asc") products.sort((a: any, b: any) => a.price - b.price);
  if (searchParams.sort === "price_desc") products.sort((a: any, b: any) => b.price - a.price);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Shop</h1>
      <div className="grid gap-4 md:grid-cols-4">
        {products.map((p: any) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
