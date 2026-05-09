"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="skeleton mx-auto mb-3 h-12 w-12 rounded-full" />
          <p className="text-sm text-slate-400">Loading admin panel…</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-brand-beige">
      {/* Admin top bar */}
      <div className="sticky top-[72px] z-30 border-b border-green-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Admin" width={100} height={38} className="h-8 w-auto" />
            <span className="rounded-full bg-brand-greenlight px-2 py-0.5 text-xs font-semibold text-brand-green">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-slate-400 sm:block">
              {session.user?.email}
            </span>
            <a
              href="/"
              className="rounded-lg border border-green-200 px-3 py-1.5 text-xs font-medium text-brand-green hover:bg-brand-greenlight"
            >
              View Site
            </a>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
