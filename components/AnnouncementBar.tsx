import { connectDB } from "@/lib/db";
import { Setting } from "@/models/Setting";

export default async function AnnouncementBar() {
  let text = "New arrivals from our latest collections. Call 7588267528";
  try {
    await connectDB();
    const announcement: any = await Setting.findOne({ key: "announcement" }).lean();
    if (announcement && typeof announcement.value === "string" && announcement.value.trim()) {
      text = announcement.value;
    }
  } catch {
    // fallback to static text when DB isn't reachable
  }
  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-brand-green py-2 text-sm text-white">
      <div className="marquee px-4">
        {text}
      </div>
    </div>
  );
}
