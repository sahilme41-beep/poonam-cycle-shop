import { Search } from "lucide-react";

export default function ShopSearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action="/shop" method="get" className="flex w-full max-w-md items-center gap-2">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          name="q"
          defaultValue={defaultValue}
          placeholder="Search products…"
          className="w-full rounded-xl border border-green-200 py-2.5 pl-9 pr-3 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
        />
      </div>
      <button
        type="submit"
        className="rounded-xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-green2"
      >
        Search
      </button>
    </form>
  );
}
