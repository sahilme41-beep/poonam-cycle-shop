import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-green-100 bg-brand-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm md:grid-cols-4">
        <div className="md:col-span-2">
          <Image src="/logo.svg" alt="Poonam Cycle & Toy World" width={210} height={70} className="h-16 w-auto" />
          <p className="mt-3 max-w-xs text-slate-400">Your trusted destination for premium cycles, kids electric rides, and toys in Kolhapur.</p>
          <p className="mt-3 text-slate-400">Near Kaswam Hospital, Gandhinagar,<br/>Kolhapur, Maharashtra</p>
        </div>
        <div>
          <p className="mb-3 font-semibold text-white">Contact</p>
          <div className="space-y-1.5 text-slate-400">
            <p><a href="tel:7588267528" className="hover:text-green-400">📞 7588267528</a> (Mobile)</p>
            <p><a href="tel:9359165468" className="hover:text-green-400">📞 9359165468</a> (Sales)</p>
            <p><a href="tel:9422043565" className="hover:text-green-400">📞 9422043565</a> (Inquiry)</p>
            <p><a href="tel:7057902565" className="hover:text-green-400">📞 7057902565</a> (Inquiry)</p>
            <p className="mt-2"><a href="https://instagram.com/poonam_cycle" target="_blank" rel="noreferrer" className="hover:text-green-400">Instagram: @poonam_cycle</a></p>
          </div>
        </div>
        <div>
          <p className="mb-3 font-semibold text-white">Quick Links</p>
          <div className="space-y-2">
            <Link href="/shop" className="block text-slate-400 hover:text-green-400">Shop</Link>
            <Link href="/category/electric-cycles" className="block text-slate-400 hover:text-green-400">Electric Cycles</Link>
            <Link href="/category/electric-cars-toys" className="block text-slate-400 hover:text-green-400">Electric Cars &amp; Toys</Link>
            <Link href="/category/kids-mtb-cycles" className="block text-slate-400 hover:text-green-400">Kids &amp; MTB Cycles</Link>
            <Link href="/category/tricycles" className="block text-slate-400 hover:text-green-400">Tricycles</Link>
            <Link href="/about" className="block text-slate-400 hover:text-green-400">About</Link>
            <Link href="/contact" className="block text-slate-400 hover:text-green-400">Contact</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Poonam Cycle &amp; Toy World. All rights reserved.
        <span className="mx-2">·</span>
        <Link href="/admin" className="hover:text-slate-300">Admin</Link>
      </div>
    </footer>
  );
}
