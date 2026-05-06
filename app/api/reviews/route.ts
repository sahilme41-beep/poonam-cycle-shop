import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Review } from "@/models/Review";

export async function GET() {
  await connectDB();
  return NextResponse.json(await Review.find().sort({ createdAt: -1 }));
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  return NextResponse.json(await Review.create(body));
}

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Review.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
