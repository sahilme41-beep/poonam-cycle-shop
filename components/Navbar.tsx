"use client";

import Link from "next/link";
import { ChevronDown, Instagram, Menu, MessageCircle, Search, X } from "lucide-react";
import { useState } from "react";
import { BUSINESS, STORE_CATEGORIES } from "@/lib/constants";

const navCategories = STORE_CATEGORIES;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header className="fixed top-8 z-40 w-full border-b border-[#e9d8c7]/80 bg-brand-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-sm font-extrabold text-brand-brown md:text-lg">
          Poonam Cycle & Toy World
        </Link>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          <div className="group relative">
            <button className="inline-flex items-center gap-1 font-medium">
              Categories <ChevronDown size={14} />
            </button>
            <div className="invisible absolute left-0 top-full z-50 mt-3 w-[560px] rounded-xl border bg-white p-4 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-4">
                {navCategories.map((category) => (
                  <div key={category.slug} className="rounded-lg border border-slate-200 p-3">
                    <Link href={`/category/${category.slug}`} className="font-semibold text-brand-brown">
                      {category.name}
                    </Link>
                    <div className="mt-2 space-y-1">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          href={`/category/${category.slug}?sub=${encodeURIComponent(sub)}`}
                          className="block text-xs text-slate-600 hover:text-brand-brown"
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
          <Link href="/shop" className="font-medium text-slate-700 hover:text-brand-brown">Shop</Link>
          <Link href="/about" className="font-medium text-slate-700 hover:text-brand-brown">About</Link>
          <Link href="/contact" className="font-medium text-slate-700 hover:text-brand-brown">Contact</Link>
          <Link href="/admin" className="rounded-md border border-[#d7bda8] bg-white px-3 py-1.5 font-medium text-brand-brown hover:bg-[#fbf3ea]">Admin</Link>
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
          <a href={`https://wa.me/91${BUSINESS.whatsapp}`} target="_blank" rel="noreferrer" className="rounded border border-[#d7bda8] bg-white p-2 hover:border-brand-brown">
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
                    <Link href={`/category/${category.slug}`} className="block text-xs font-semibold text-brand-brown" onClick={() => setMobileOpen(false)}>
                      View All {category.name}
                    </Link>
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        href={`/category/${category.slug}?sub=${encodeURIComponent(sub)}`}
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
