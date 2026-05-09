import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";

function normalizePayload(body: any) {
  const variants = (body.variants || []).map((v: any) => {
    const images = v.images?.length ? v.images : v.image ? [v.image] : [];
    return { ...v, image: v.image || images[0] || "", images };
  });
  return { ...body, variants };
}

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await connectDB();
  const body = normalizePayload(await req.json());
  const created = await Product.create(body);
  return NextResponse.json(created);
}

export async function PUT(req: Request) {
  await connectDB();
  const body = normalizePayload(await req.json());
  const updated = await Product.findByIdAndUpdate(body.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
