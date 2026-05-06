import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Setting } from "@/models/Setting";

export async function GET() {
  await connectDB();
  return NextResponse.json(await Setting.find());
}

export async function POST(req: Request) {
  await connectDB();
  const { key, value } = await req.json();
  const saved = await Setting.findOneAndUpdate({ key }, { value }, { upsert: true, new: true });
  return NextResponse.json(saved);
}
