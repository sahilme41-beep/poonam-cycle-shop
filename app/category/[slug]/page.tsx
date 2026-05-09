import ProductCard from "@/components/ProductCard";
import { getStoreProducts } from "@/lib/storefront";
import { STORE_CATEGORIES, formatCategorySlug } from "@/lib/constants";
import CategoryHeroSlider from "@/components/CategoryHeroSlider";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { sub?: string };
}) {
  const all: any[] = await getStoreProducts();
  const categoryConfig = STORE_CATEGORIES.find((c) => c.slug === params.slug);
  const fallbackName = decodeURIComponent(params.slug).replaceAll("-", " ");
  const categoryName = categoryConfig?.name || fallbackName;
  const selectedSub = (searchParams.sub || "").toLowerCase();
  const products = all.filter((p: any) => {
    const sameCategory =
      formatCategorySlug(String(p.category || "")) === params.slug ||
      String(p.category || "").toLowerCase() === categoryName.toLowerCase();
    if (!sameCategory) return false;
    if (!selectedSub) return true;
    return String(p.subcategory || "").toLowerCase() === selectedSub;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <CategoryHeroSlider title={categoryName} subtitle={`${products.length} products available`} cta="/shop" />
      <div className="mt-6">
        <h1 className="mb-1 text-3xl font-bold text-brand-ink">{categoryName}</h1>
        <p className="mb-5 text-sm text-slate-600">{products.length} products found</p>
      </div>
      {categoryConfig?.subcategories?.length ? (
        <div className="mb-5 flex flex-wrap gap-2">
          <a href={`/category/${params.slug}`} className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${!selectedSub ? "border-brand-green bg-brand-green text-white" : "border-green-200 bg-white text-slate-600 hover:border-brand-green hover:text-brand-green"}`}>
            All
          </a>
          {categoryConfig.subcategories.map((sub) => (
            <a
              key={sub}
              href={`/category/${params.slug}?sub=${encodeURIComponent(sub)}`}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${selectedSub === sub.toLowerCase() ? "border-brand-green bg-brand-green text-white" : "border-green-200 bg-white text-slate-600 hover:border-brand-green hover:text-brand-green"}`}
            >
              {sub}
            </a>
          ))}
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {products.map((p: any) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
      {!products.length ? <p className="mt-8 text-center text-slate-500">No products found in this category.</p> : null}
    </div>
  );
}
