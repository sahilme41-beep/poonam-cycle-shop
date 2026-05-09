import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#e9d8c7] bg-brand-cream">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm md:grid-cols-3">
        <div>
          <h4 className="text-base font-semibold text-brand-ink">Poonam Cycle & Toy World</h4>
          <p className="mt-2 text-slate-600">Near Kaswam Hospital, Gandhinagar, Kolhapur, Maharashtra</p>
          <p className="mt-2 text-xs text-slate-500">Trusted electric ride-on and tricycle destination for families.</p>
        </div>
        <div>
          <p className="font-medium text-slate-800">Contact</p>
          <p className="mt-2 text-slate-600">Mobile: 7588267528 | Sales: 9359165468</p>
          <p className="text-slate-600">Inquiry: 9422043565 / 7057402575</p>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-slate-800">Quick links</p>
          <Link href="/shop" className="block text-slate-600 hover:text-brand-brown">
            Shop
          </Link>
          <Link href="/about" className="block text-slate-600 hover:text-brand-brown">
            About
          </Link>
          <Link href="/contact" className="block text-slate-600 hover:text-brand-brown">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
