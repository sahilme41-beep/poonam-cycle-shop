import ProductCard from "@/components/ProductCard";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/products`, { cache: "no-store" });
  const all = await res.json();
  const name = decodeURIComponent(params.slug).replaceAll("-", " ");
  const products = all.filter((p: any) => p.category.toLowerCase() === name.toLowerCase());

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">{name}</h1>
      <div className="grid gap-4 md:grid-cols-4">
        {products.map((p: any) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
