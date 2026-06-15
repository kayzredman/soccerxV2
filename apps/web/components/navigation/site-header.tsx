"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

var navItems = [
  { href: "/", label: "Home" },
  { href: "/bracket", label: "Bracket" },
  { href: "/matches", label: "Matches" },
  { href: "/daily", label: "Daily" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/me", label: "My Game" },
];

export function SiteHeader() {
  var pathname = usePathname();
  var { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-surface/60 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-lg shadow-brand-500/20">
            <span className="text-sm font-black text-white">SX</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">SoccerX</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(function(item) {
            var isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                  isActive ? "bg-white/[0.08] text-white" : "text-white/45 hover:bg-white/[0.04] hover:text-white/75"
                )}
              >{item.label}</Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <button className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:shadow-brand-500/40">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}
