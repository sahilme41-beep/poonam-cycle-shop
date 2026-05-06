export default function Home() {
  return (
    <div>
      <section
        className="flex h-[70vh] items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1800&auto=format&fit=crop')"
        }}
      >
        <div className="rounded-xl bg-black/45 p-6 text-center text-white">
          <h1 className="text-4xl font-bold">Poonam Cycle & Toy World</h1>
          <p className="mt-2">Premium cycles and toys in Kolhapur</p>
          <a href="/shop" className="mt-4 inline-block rounded bg-green-600 px-4 py-2">
            Explore Products
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="mb-4 text-2xl font-bold">Categories</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            "MTB Cycles",
            "Gear Cycles",
            "Kids Cycles",
            "Electric Ride-On",
            "Tricycles",
            "Electric Cars & Toys"
          ].map((c) => (
            <a key={c} href={`/shop?category=${encodeURIComponent(c)}`} className="rounded-lg bg-white p-4 shadow-sm">
              {c}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
