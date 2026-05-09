import { connectDB } from "@/lib/db";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
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
  try {
    await connectDB();
    const categories = await Category.find().sort({ order: 1, createdAt: 1 }).lean();
    if (!categories.length) return STORE_CATEGORIES;
    return categories;
  } catch {
    return STORE_CATEGORIES;
  }
}
