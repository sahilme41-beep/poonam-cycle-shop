import { BUSINESS } from "@/lib/constants";

export default function WhatsappFloating() {
  return (
    <a
      href={`https://wa.me/91${BUSINESS.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-40 rounded-full bg-amber-800 px-4 py-3 text-sm font-semibold text-white shadow-lg md:bottom-6 md:right-6"
    >
      WhatsApp
    </a>
  );
}
