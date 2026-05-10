import ProductCard from "@/components/ProductCard";
import { getStoreProducts, getStoreMediaSettings, getStoreCategories } from "@/lib/storefront";
import { STORE_CATEGORIES, formatCategorySlug } from "@/lib/constants";
import Link from "next/link";

export const dynamic = "force-dynamic";

const categoryDefaults: Record<string, { image: string; description: string; icon: string }> = {
  "electric-cycles": {
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=1600&auto=format&fit=crop",
    description: "Premium electric cycles for daily commutes and adventure rides. Eco-friendly, powerful, and built for Kolhapur roads.",
    icon: "⚡"
  },
  "electric-cars-toys": {
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1600&auto=format&fit=crop",
    description: "Battery-operated jeeps, cars, scooters, and bikes for kids. Available in multiple fun colours.",
    icon: "🚗"
  },
  tricycles: {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600&auto=format&fit=crop",
    description: "Stable, safe, and comfortable three-wheelers for toddlers and young children.",
    icon: "🛺"
  },
  "kids-mtb-cycles": {
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=1600&auto=format&fit=crop",
    description: "Kids bicycles, mountain bikes, and gear cycles for all age groups — perfect for growth and adventure.",
    icon: "🚵"
  }
};

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { sub?: string };
}) {
  const [all, mediaSettings, dbCategories] = await Promise.all([
    getStoreProducts(),
    getStoreMediaSettings(),
    getStoreCategories()
  ]);

  const categoryConfig = (dbCategories as any[]).find((c) => c.slug === params.slug) || STORE_CATEGORIES.find((c) => c.slug === params.slug);
  const fallbackName = decodeURIComponent(params.slug).replaceAll("-", " ");
  const categoryName = categoryConfig?.name || fallbackName;
  const selectedSub = (searchParams.sub || "").toLowerCase();

  const defaults = categoryDefaults[params.slug] || {
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=1600&auto=format&fit=crop",
    description: "Browse our full collection.",
    icon: "🛒"
  };

  // Use admin-uploaded image if available, else fallback
  const heroImage = (mediaSettings.categoryCardImages as Record<string, string>)?.[params.slug] || defaults.image;

  const allInCategory = all.filter((p: any) =>
    formatCategorySlug(String(p.category || "")) === params.slug ||
    String(p.category || "").toLowerCase() === categoryName.toLowerCase()
  );

  const products = selectedSub
    ? allInCategory.filter((p: any) => String(p.subcategory || "").toLowerCase() === selectedSub)
    : allInCategory;

  return (
    <div className="pb-12">
      {/* ── Full-width hero ── */}
      <div className="relative h-56 w-full overflow-hidden sm:h-72 md:h-80">
        <img src={heroImage} alt={categoryName} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6 md:px-12">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Link href="/" className="text-xs text-white/70 hover:text-white">Home</Link>
              <span className="text-white/40">›</span>
              <Link href="/shop" className="text-xs text-white/70 hover:text-white">Categories</Link>
              <span className="text-white/40">›</span>
              <span className="text-xs text-white font-semibold">{categoryName}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white drop-shadow sm:text-4xl md:text-5xl">
              {defaults.icon} {categoryName}
            </h1>
            <p className="mt-2 max-w-lg text-sm text-white/80 sm:text-base">{defaults.description}</p>
            <p className="mt-3 inline-block rounded-full bg-brand-green/90 px-3 py-1 text-xs font-semibold text-white">
              {allInCategory.length} product{allInCategory.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8">
        {/* ── Subcategory pills ── */}
        {categoryConfig?.subcategories?.length ? (
          <div className="mb-6 flex flex-wrap gap-2">
            <a
              href={`/category/${params.slug}`}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${!selectedSub ? "border-brand-green bg-brand-green text-white shadow-sm" : "border-green-200 bg-white text-slate-600 hover:border-brand-green hover:text-brand-green"}`}
            >
              All ({allInCategory.length})
            </a>
            {categoryConfig.subcategories.map((sub) => {
              const count = allInCategory.filter((p: any) => String(p.subcategory || "").toLowerCase() === sub.toLowerCase()).length;
              return (
                <a
                  key={sub}
                  href={`/category/${params.slug}?sub=${encodeURIComponent(sub)}`}
                  className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${selectedSub === sub.toLowerCase() ? "border-brand-green bg-brand-green text-white shadow-sm" : "border-green-200 bg-white text-slate-600 hover:border-brand-green hover:text-brand-green"}`}
                >
                  {sub} ({count})
                </a>
              );
            })}
          </div>
        ) : null}

        {/* ── Product grid ── */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="text-xl font-bold text-brand-ink">No products found</h3>
            <p className="mt-2 text-slate-500">
              {selectedSub ? `No products in "${selectedSub}" subcategory yet.` : "No products in this category yet."}
            </p>
            <div className="mt-5 flex gap-3">
              {selectedSub && (
                <Link href={`/category/${params.slug}`} className="rounded-xl border border-brand-green px-5 py-2.5 font-semibold text-brand-green hover:bg-brand-greenlight">
                  View All {categoryName}
                </Link>
              )}
              <Link href="/shop" className="rounded-xl bg-brand-green px-5 py-2.5 font-semibold text-white hover:bg-brand-green2">
                Browse All Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
