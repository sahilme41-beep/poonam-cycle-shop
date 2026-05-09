import { unstable_noStore as noStore } from "next/cache";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { Review } from "@/models/Review";
import { Setting } from "@/models/Setting";
import { normalizeCategoryName, STORE_CATEGORIES } from "@/lib/constants";

function normalizeProductCategoryFields(products: any[]) {
  const normalized = products.map((p: any) => ({
    ...p,
    category: normalizeCategoryName(String(p.category || ""), String(p.name || ""), String(p.description || ""))
  }));

  // Hide duplicate legacy records imported from older snapshots.
  const byKey = new Map<string, any>();
  for (const p of normalized) {
    const key = String(p.notionKey || p.name || p._id || "").toLowerCase().trim();
    if (!key) continue;
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, p);
      continue;
    }
    const existingHasNotion = Boolean(existing.notionKey);
    const currentHasNotion = Boolean(p.notionKey);
    if (!existingHasNotion && currentHasNotion) {
      byKey.set(key, p);
      continue;
    }
    const existingTime = new Date(existing.updatedAt || existing.createdAt || 0).getTime();
    const currentTime = new Date(p.updatedAt || p.createdAt || 0).getTime();
    if (currentTime > existingTime) byKey.set(key, p);
  }
  return Array.from(byKey.values());
}

export async function getStoreProducts() {
  noStore();
  try {
    await connectDB();
    // Treat legacy docs (missing `visible`) as visible.
    const products = await Product.find({ visible: { $ne: false } }).sort({ order: 1, createdAt: -1 }).lean();
    return normalizeProductCategoryFields(products as any[]);
  } catch {
    return [];
  }
}

export async function getFeaturedProducts(limit = 8) {
  noStore();
  try {
    await connectDB();
    // Treat legacy docs (missing `visible`) as visible.
    const products = await Product.find({ visible: { $ne: false }, featured: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(limit)
      .lean();
    return normalizeProductCategoryFields(products as any[]);
  } catch {
    return [];
  }
}

export async function getStoreCategories() {
  noStore();
  try {
    await connectDB();
    const categories = await Category.find().sort({ order: 1, createdAt: 1 }).lean();
    if (!categories.length) return STORE_CATEGORIES;
    return categories;
  } catch {
    return STORE_CATEGORIES;
  }
}

export async function getReviews(limit = 6) {
  noStore();
  try {
    await connectDB();
    return await Review.find().sort({ createdAt: -1 }).limit(limit).lean();
  } catch {
    return [];
  }
}

export async function getStoreMediaSettings() {
  noStore();
  const fallback = {
    homeBannerImages: [],
    categoryCardImages: {} as Record<string, string>
  };
  try {
    await connectDB();
    const [homeBanner, categoryCard] = await Promise.all([
      Setting.findOne({ key: "homeBannerImages" }).lean(),
      Setting.findOne({ key: "categoryCardImages" }).lean()
    ]);
    return {
      homeBannerImages: Array.isArray((homeBanner as any)?.value) ? (homeBanner as any).value : fallback.homeBannerImages,
      categoryCardImages:
        (categoryCard as any)?.value && typeof (categoryCard as any).value === "object"
          ? ((categoryCard as any).value as Record<string, string>)
          : fallback.categoryCardImages
    };
  } catch {
    return fallback;
  }
}
