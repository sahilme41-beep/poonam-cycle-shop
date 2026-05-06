"use client";

import Link from "next/link";
import { Instagram, Menu, MessageCircle, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-8 z-40 w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="text-sm font-extrabold text-green-700 md:text-lg">
          Poonam Cycle & Toy World
        </Link>
        <nav className="hidden items-center gap-4 text-sm md:flex">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button className="rounded border p-2 md:hidden" aria-label="Open menu">
            <Menu size={16} />
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
    </header>
  );
}
