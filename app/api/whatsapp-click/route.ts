import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";

export async function POST(req: Request) {
  const { id } = await req.json();
  await connectDB();
  await Product.findByIdAndUpdate(id, { $inc: { whatsappClicks: 1 } });
  return NextResponse.json({ ok: true });
}
