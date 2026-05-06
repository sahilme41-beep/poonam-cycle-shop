import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ContactMessage } from "@/models/ContactMessage";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.name || !body.mobile || !body.message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }
  await connectDB();
  await ContactMessage.create(body);
  return NextResponse.json({ ok: true });
}
