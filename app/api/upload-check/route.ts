import { NextResponse } from "next/server";

export async function GET() {
  const ok =
    Boolean(process.env.CLOUDINARY_CLOUD_NAME) &&
    Boolean(process.env.CLOUDINARY_API_KEY) &&
    Boolean(process.env.CLOUDINARY_API_SECRET);
  return NextResponse.json({ ok });
}
