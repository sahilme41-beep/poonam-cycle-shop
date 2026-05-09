"use client";

import Link from "next/link";
import { ChevronDown, Instagram, Menu, MessageCircle, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BUSINESS, STORE_CATEGORIES } from "@/lib/constants";
import Image from "next/image";

const navCategories = STORE_CATEGORIES;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [catOpen, setCatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const catRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQ.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQ.trim())}`);
      setSearchOpen(false);
      setSearchQ("");
    }
  }

  function navLink(href: string) {
    const active = pathname === href;
    return `rounded-lg px-3 py-2 font-medium transition ${
      active
        ? "bg-brand-greenlight text-brand-green"
        : "text-slate-700 hover:bg-brand-greenlight hover:text-brand-green"
    }`;
  }

  return (
    <header className={`fixed top-8 z-40 w-full border-b border-green-100 bg-white/97 backdrop-blur transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.svg" alt="Poonam Cycle & Toy World" width={170} height={60} priority className="h-11 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 text-sm md:flex">
          <Link href="/" className={navLink("/")}>
            Home
          </Link>

          {/* Click-based categories dropdown */}
          <div className="relative" ref={catRef}>
            <button
              onClick={() => setCatOpen((prev) => !prev)}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-brand-greenlight hover:text-brand-green"
            >
              Categories <ChevronDown size={14} className={`transition-transform ${catOpen ? "rotate-180" : ""}`} />
            </button>
            {catOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-[580px] rounded-2xl border border-green-100 bg-white p-5 shadow-xl">
                <div className="grid grid-cols-3 gap-3">
                  {navCategories.map((category) => (
                    <div key={category.slug} className="rounded-xl border border-green-100 bg-brand-greenlight p-3 hover:border-brand-green">
                      <Link
                        href={`/category/${category.slug}`}
                        className="block font-semibold text-brand-green hover:underline"
                        onClick={() => setCatOpen(false)}
                      >
                        {category.name}
                      </Link>
                      <div className="mt-2 space-y-1">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub}
                            href={`/category/${category.slug}?sub=${encodeURIComponent(sub)}`}
                            className="block text-xs text-slate-600 hover:text-brand-green"
                            onClick={() => setCatOpen(false)}
                          >
                            › {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/shop" className={navLink("/shop")}>Shop</Link>
          <Link href="/about" className={navLink("/about")}>About</Link>
          <Link href="/contact" className={navLink("/contact")}>Contact</Link>
        </nav>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg border border-slate-200 p-2 md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          {searchOpen ? (
            <form onSubmit={handleSearch} className="hidden md:flex items-center gap-1">
              <input
                ref={searchRef}
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Search products…"
                className="w-44 rounded-lg border border-green-200 px-3 py-1.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
              />
              <button type="submit" className="rounded-lg bg-brand-green p-2 text-white hover:bg-brand-green2"><Search size={14} /></button>
              <button type="button" onClick={() => setSearchOpen(false)} className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"><X size={14} /></button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="hidden rounded-lg border border-slate-200 p-2 hover:border-brand-green hover:text-brand-green md:inline-flex" aria-label="Search">
              <Search size={16} />
            </button>
          )}
          <a
            href={`https://wa.me/91${BUSINESS.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-green-200 bg-green-50 p-2 text-green-700 hover:bg-green-100"
            aria-label="WhatsApp"
          >
            <MessageCircle size={16} />
          </a>
          <a
            href="https://instagram.com/poonam_cycle"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-200 p-2 hover:border-brand-green hover:text-brand-green"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-green-100 bg-white px-4 py-4 md:hidden">
          <Link href="/" className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-greenlight hover:text-brand-green" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link href="/shop" className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-greenlight hover:text-brand-green" onClick={() => setMobileOpen(false)}>
            Shop
          </Link>
          <div className="mt-1 overflow-hidden rounded-xl border border-green-100">
            {navCategories.map((category) => (
              <div key={category.slug} className="border-b border-green-100 last:border-b-0">
                <button
                  className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-medium hover:text-brand-green"
                  onClick={() => setMobileExpanded((prev) => (prev === category.slug ? null : category.slug))}
                >
                  {category.name}
                  <ChevronDown size={14} className={`transition-transform ${mobileExpanded === category.slug ? "rotate-180" : ""}`} />
                </button>
                {mobileExpanded === category.slug && (
                  <div className="space-y-1 bg-brand-greenlight px-4 py-2">
                    <Link
                      href={`/category/${category.slug}`}
                      className="block text-xs font-semibold text-brand-green"
                      onClick={() => setMobileOpen(false)}
                    >
                      View All {category.name}
                    </Link>
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        href={`/category/${category.slug}?sub=${encodeURIComponent(sub)}`}
                        className="block text-xs text-slate-600 hover:text-brand-green"
                        onClick={() => setMobileOpen(false)}
                      >
                        › {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1">
            <Link href="/about" className="block rounded-lg px-3 py-2.5 text-sm hover:bg-brand-greenlight hover:text-brand-green" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="block rounded-lg px-3 py-2.5 text-sm hover:bg-brand-greenlight hover:text-brand-green" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
