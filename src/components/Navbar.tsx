import Image from "next/image";
import { UserRound } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "Destinations", href: "#" },
  { label: "My Bookings", href: "#" },
  { label: "Admin", href: "#" },
];

export default function Navbar() {
  return (
    <header className="relative z-20 flex h-16 shrink-0 items-center justify-between border-b border-black/5 bg-white px-4 shadow-sm md:px-6">
      <nav className="flex items-center gap-4 md:gap-6">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`text-sm font-medium transition-colors hover:text-brand ${
              link.active ? "text-brand" : "hidden text-foreground/80 md:inline"
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/assets/Wanderlast.png"
          alt="Wanderlast"
          width={162}
          height={24}
          className="h-6 w-auto md:h-7"
        />
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <a
          href="#"
          className="hidden items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-brand md:flex"
        >
          <UserRound className="h-4 w-4" aria-hidden="true" />
          Profile
        </a>
        <a
          href="#"
          className="text-sm font-medium text-foreground/80 transition-colors hover:text-brand"
        >
          Login
        </a>
        <a
          href="#"
          className="text-sm font-medium text-foreground/80 transition-colors hover:text-brand"
        >
          Sign Up
        </a>
      </div>
    </header>
  );
}
