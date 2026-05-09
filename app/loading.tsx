export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="skeleton mb-6 h-9 w-56 rounded-xl" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">
            <div className="skeleton h-48 w-full rounded-none" />
            <div className="p-3">
              <div className="skeleton mb-2 h-3 w-16 rounded-full" />
              <div className="skeleton mb-1 h-4 w-full rounded-lg" />
              <div className="skeleton mb-3 h-4 w-2/3 rounded-lg" />
              <div className="skeleton h-5 w-20 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
