import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found — Wanderlust",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-display text-7xl font-medium text-brand md:text-8xl" aria-hidden="true">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl text-foreground md:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground md:text-base">
        The page you’re looking for has drifted off the map. Let’s get you back to somewhere
        familiar.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-lg bg-brand px-6 text-sm font-medium text-white transition-colors hover:bg-brand/90"
        >
          Back to Home
        </Link>
        <Link
          href="/destinations"
          className="inline-flex h-10 items-center rounded-lg border border-border bg-white px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Browse Destinations
        </Link>
      </div>
    </main>
  );
}
