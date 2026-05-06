"use client";

import Link from "next/link";
import { ChevronDown, Instagram, Menu, MessageCircle, Search, X } from "lucide-react";
import { useState } from "react";

const navCategories = [
  { name: "MTB Cycles", slug: "mtb-cycles", subcategories: ["Trail", "Hardtail", "Performance"] },
  { name: "Gear Cycles", slug: "gear-cycles", subcategories: ["Road", "Hybrid", "City Gear"] },
  { name: "Kids Cycles", slug: "kids-cycles", subcategories: ["2-5 Years", "6-10 Years", "Girls", "Boys"] },
  { name: "Electric Ride-On", slug: "electric-ride-on", subcategories: ["Mini Bikes", "Kids EV"] },
  { name: "Tricycles", slug: "tricycles", subcategories: ["Classic", "Parent Push", "Premium"] },
  { name: "Electric Cars & Toys", slug: "electric-cars-toys", subcategories: ["Cars", "Bikes", "Jeeps", "Scooters"] }
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header className="fixed top-8 z-40 w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="text-sm font-extrabold text-green-700 md:text-lg">
          Poonam Cycle & Toy World
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          <div className="group relative">
            <button className="inline-flex items-center gap-1 font-medium">
              Categories <ChevronDown size={14} />
            </button>
            <div className="invisible absolute left-0 top-full z-50 mt-3 w-[760px] rounded-xl border bg-white p-4 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-3 gap-4">
                {navCategories.map((category) => (
                  <div key={category.slug} className="rounded-lg border p-3">
                    <Link href={`/category/${category.slug}`} className="font-semibold text-green-700">
                      {category.name}
                    </Link>
                    <div className="mt-2 space-y-1">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          href={`/shop?category=${encodeURIComponent(category.name)}&q=${encodeURIComponent(sub)}`}
                          className="block text-xs text-slate-600 hover:text-green-700"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button
            className="rounded border p-2 md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
          <Link href="/shop" className="hidden rounded border p-2 md:inline-flex" aria-label="Search">
            <Search size={16} />
          </Link>
          <a href="https://wa.me/917588267528" target="_blank" rel="noreferrer" className="rounded border p-2">
            <MessageCircle size={16} />
          </a>
          <a href="https://instagram.com/poonam_cycle" target="_blank" rel="noreferrer" className="rounded border p-2">
            <Instagram size={16} />
          </a>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t bg-white px-4 py-3 md:hidden">
          <Link href="/shop" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>
            Shop
          </Link>
          <div className="mt-1 rounded border">
            {navCategories.map((category) => (
              <div key={category.slug} className="border-b last:border-b-0">
                <button
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium"
                  onClick={() =>
                    setMobileExpanded((prev) => (prev === category.slug ? null : category.slug))
                  }
                >
                  {category.name}
                  <ChevronDown size={14} />
                </button>
                {mobileExpanded === category.slug ? (
                  <div className="space-y-1 bg-slate-50 px-3 py-2">
                    <Link
                      href={`/category/${category.slug}`}
                      className="block text-xs font-semibold text-green-700"
                      onClick={() => setMobileOpen(false)}
                    >
                      View All {category.name}
                    </Link>
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        href={`/shop?category=${encodeURIComponent(category.name)}&q=${encodeURIComponent(sub)}`}
                        className="block text-xs text-slate-600"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-2">
            <Link href="/about" className="block text-sm" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="block text-sm" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
            <Link href="/admin" className="block text-sm" onClick={() => setMobileOpen(false)}>
              Admin
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
