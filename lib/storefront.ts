import { connectDB } from "@/lib/db";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { STORE_CATEGORIES } from "@/lib/constants";

export async function getStoreProducts() {
  try {
    await connectDB();
    // Treat legacy docs (missing `visible`) as visible.
    return await Product.find({ visible: { $ne: false } }).sort({ order: 1, createdAt: -1 }).lean();
  } catch {
    return [];
  }
}

export async function getFeaturedProducts(limit = 8) {
  try {
    await connectDB();
    // Treat legacy docs (missing `visible`) as visible.
    return await Product.find({ visible: { $ne: false }, featured: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(limit)
      .lean();
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
