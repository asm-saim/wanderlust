"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
];

const rightLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="relative z-20 flex h-16 shrink-0 items-center justify-between border-b border-black/5 bg-white px-4 shadow-sm md:px-6">
      <nav className="flex items-center gap-4 md:gap-6">
        {navLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.label}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`text-sm font-semibold text-gray-500 transition-colors hover:text-brand ${
                active ? "text-brand" : "hidden text-foreground/80 md:inline"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image src="/assets/Wanderlast.png" alt="Wanderlast" width={162} height={24} className="h-6 w-auto md:h-7" />
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <Link
          href="/profile"
          aria-current={isActive("/profile") ? "page" : undefined}
          className={`hidden items-center gap-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-brand md:flex ${
            isActive("/profile") ? "text-brand" : "text-foreground/80"
          }`}
        >
          <UserRound className="h-4 w-4" aria-hidden="true" />
          Profile
        </Link>
        {rightLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={`text-sm font-semibold text-gray-500  transition-colors hover:text-brand ${
              isActive(link.href) ? "text-brand" : "text-foreground/80"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
