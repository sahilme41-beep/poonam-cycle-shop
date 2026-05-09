import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { Review } from "@/models/Review";
import { Setting } from "@/models/Setting";
import notionProducts from "@/notion-products.json";
import electricCyclesProducts from "@/electric-cycles-products.json";
import { STORE_CATEGORIES, formatCategorySlug, resolveStoreCategory } from "@/lib/constants";
import fs from "fs";
import path from "path";

function getAllLocalImages(item: any) {
  const explicit = Array.isArray(item.localImages) ? item.localImages.filter(Boolean) : [];
  if (explicit.length) return explicit;
  if (!item.localImage) return [];

  const filename = String(item.localImage).split("/").pop() || "";
  const dot = filename.lastIndexOf(".");
  const ext = dot > -1 ? filename.slice(dot) : ".jpg";
  const base = dot > -1 ? filename.slice(0, dot) : filename;

  const productsDir = path.join(process.cwd(), "public", "products");
  if (!fs.existsSync(productsDir)) return [item.localImage];

  const matches = fs
    .readdirSync(productsDir)
    .filter((name) => name === `${base}${ext}` || name.startsWith(`${base}-`))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const urls = matches.map((name) => `/products/${name}`);
  return urls.length ? urls : [item.localImage];
}

export async function POST() {
  try {
    await connectDB();

    const categories = STORE_CATEGORIES;

    for (const c of categories) {
      await Category.findOneAndUpdate({ slug: c.slug }, c, { upsert: true, new: true });
    }
    await Category.deleteMany({ slug: { $nin: categories.map((c) => c.slug) } });

    const mergedProducts = [...(notionProducts as any[]), ...(electricCyclesProducts as any[])];
    const starterProducts = mergedProducts.map((item: any, idx) => {
      const knownCategory = resolveStoreCategory(
        String(item.category || ""),
        String(item.name || ""),
        String(item.description || "")
      );
      const images = getAllLocalImages(item);
      const notionKey = `${formatCategorySlug(String(item.category || knownCategory.name))}-${item.index ?? idx}-${formatCategorySlug(String(item.name || ""))}`;
      return {
        notionKey,
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
      const existing = await Product.findOne({
        $or: [{ notionKey: p.notionKey }, { name: p.name }]
      });
      if (existing) {
        await Product.findByIdAndUpdate(existing._id, p, { new: true });
      } else {
        await Product.create(p);
      }
    }

    // Normalize all existing products to active category taxonomy.
    const existingProducts: any[] = await Product.find({});
    for (const product of existingProducts) {
      const normalized = resolveStoreCategory(
        String(product.category || ""),
        String(product.name || ""),
        String(product.description || "")
      );
      if (product.category !== normalized.name) {
        await Product.findByIdAndUpdate(product._id, { category: normalized.name }, { new: true });
      }
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
