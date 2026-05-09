import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl">🚲</div>
      <h1 className="mt-6 text-5xl font-extrabold text-brand-ink">404</h1>
      <p className="mt-2 text-xl font-semibold text-slate-600">Page not found</p>
      <p className="mt-2 max-w-sm text-slate-400">
        Looks like this page took a wrong turn. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-xl bg-brand-green px-6 py-3 font-bold text-white hover:bg-brand-green2">
          Go Home
        </Link>
        <Link href="/shop" className="rounded-xl border border-brand-green px-6 py-3 font-semibold text-brand-green hover:bg-brand-greenlight">
          Browse Shop
        </Link>
      </div>
    </div>
  );
}
