import Image from "next/image";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export default function Banner() {
  return (
    <section className="relative isolate min-h-0 flex-1 overflow-hidden">
      <Image
        src="/assets/Banner.png"
        alt="Aerial view of a turquoise bay"
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="-z-10 object-cover"
      />

      <div className="flex h-full min-h-0 flex-col">
        {/* Hero copy — centered in whatever space remains above the search bar */}
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-4 pt-6 pb-4 text-center">
          <h1 className="font-display text-4xl leading-[1.05] text-white drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
            Discover Your
            <br />
            Next Adventure
          </h1>
          <p className="mt-4 max-w-lg text-sm text-white/90 md:text-base">
            Explore breathtaking destinations and create unforgettable memories
            with our curated travel experiences.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <a
              href="#"
              className="flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand/90 md:text-sm"
            >
              Explore Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#"
              className="rounded-md bg-white/20 px-6 py-3 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white/30 md:text-sm"
            >
              View Destination
            </a>
          </div>
        </div>

        {/* Search bar — pinned to the bottom edge of the hero */}
        <div className="shrink-0 bg-black/40 backdrop-blur-xs">
          <div className="flex flex-wrap items-stretch">
            {searchFields.map((field) => (
              <div
                key={field.label}
                className="min-w-0 flex-1 border-b border-white/15 px-5 py-2.5 text-left md:border-b-0 md:border-r md:border-white/15"
              >
                <p className="truncate text-sm font-semibold text-white">
                  {field.label}
                </p>
                <p className="truncate text-xs text-white/70">
                  {field.placeholder}
                </p>
              </div>
            ))}
            <button
              type="button"
              className="bg-brand px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-brand/90 md:px-12 md:text-base"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
