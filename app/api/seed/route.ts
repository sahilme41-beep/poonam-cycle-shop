import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { Review } from "@/models/Review";
import { Setting } from "@/models/Setting";
import notionProducts from "@/notion-products.json";
import { STORE_CATEGORIES, formatCategorySlug } from "@/lib/constants";

export async function POST() {
  try {
    await connectDB();

    const categories = STORE_CATEGORIES;

    for (const c of categories) {
      await Category.findOneAndUpdate({ slug: c.slug }, c, { upsert: true, new: true });
    }

    const starterProducts = notionProducts.map((item: any, idx) => {
      const knownCategory =
        STORE_CATEGORIES.find(
          (c) =>
            c.name.toLowerCase() === String(item.category || "").toLowerCase() ||
            c.slug === formatCategorySlug(String(item.category || ""))
        ) || STORE_CATEGORIES[0];
      const images = Array.isArray(item.localImages)
        ? item.localImages
        : item.localImage
          ? [item.localImage]
          : [];
      return {
        name: item.name,
        price: item.price ?? item.mrp ?? 0,
        category: knownCategory.name,
        subcategory: "",
        stock: 10,
        visible: true,
        description: item.description || "",
        variants: [{ color: "Default", image: images[0] || "", images }],
        features: item.features || [],
        specs: item.mrp ? [{ key: "MRP", value: `Rs ${item.mrp}` }] : [],
        featured: idx < 8,
        order: idx
      };
    });

    for (const p of starterProducts) {
      await Product.findOneAndUpdate({ name: p.name }, p, { upsert: true, new: true });
    }

    await Review.findOneAndUpdate(
      { name: "Rahul K" },
      { name: "Rahul K", rating: 5, message: "Great collection and very helpful staff." },
      { upsert: true, new: true }
    );
    await Setting.findOneAndUpdate(
      { key: "announcement" },
      { key: "announcement", value: "New arrivals from our latest Electric and Tricycle collections." },
      { upsert: true, new: true }
    );

    return NextResponse.json({ ok: true, message: "Seed completed", products: starterProducts.length });
  } catch (error: any) {
    console.error("Seed failed", error);
    return NextResponse.json({ ok: false, error: error?.message || "Seed failed" }, { status: 500 });
  }
}
