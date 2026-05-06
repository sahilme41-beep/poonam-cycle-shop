import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { Review } from "@/models/Review";
import { Setting } from "@/models/Setting";

export async function POST() {
  await connectDB();

  const categories = [
    { name: "MTB Cycles", slug: "mtb-cycles", subcategories: ["Trail", "Hardtail"] },
    { name: "Gear Cycles", slug: "gear-cycles", subcategories: ["Road", "Hybrid"] },
    { name: "Kids Cycles", slug: "kids-cycles", subcategories: ["2-5 years", "6-10 years"] },
    { name: "Electric Ride-On", slug: "electric-ride-on", subcategories: ["Ride Bikes"] },
    { name: "Tricycles", slug: "tricycles", subcategories: ["Classic", "Deluxe"] },
    { name: "Electric Cars & Toys", slug: "electric-cars-toys", subcategories: ["Cars", "Bikes", "Jeeps", "Scooters"] }
  ];

  for (const c of categories) {
    await Category.findOneAndUpdate({ slug: c.slug }, c, { upsert: true, new: true });
  }

  const starterProducts = [
    {
      name: "Thunder MTB 29T",
      price: 18999,
      category: "MTB Cycles",
      subcategory: "Trail",
      stock: 8,
      visible: true,
      variants: [{ color: "Black", image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800" }],
      features: ["Shock Absorber", "Disc Brakes", "All Terrain Tires"],
      specs: [{ key: "Frame", value: "Alloy" }, { key: "Wheel", value: "29T" }],
      featured: true
    },
    {
      name: "Kids Fun Ride 20T",
      price: 7499,
      category: "Kids Cycles",
      subcategory: "6-10 years",
      stock: 12,
      visible: true,
      variants: [{ color: "Blue", image: "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=800" }],
      features: ["Training Support", "Soft Seat", "Safety Grip"],
      specs: [{ key: "Wheel", value: "20T" }],
      featured: true
    }
  ];

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
    { key: "announcement", value: "New arrivals in MTB and Kids Cycles. Visit today." },
    { upsert: true, new: true }
  );

  return NextResponse.json({ ok: true, message: "Seed completed" });
}
