"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin, RotateCw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const API_URL = "http://localhost:8000/destinations";

const priceRanges = [
  { value: "all", label: "All Prices", min: 0, max: Infinity },
  { value: "u1000", label: "Under $1000", min: 0, max: 1000 },
  { value: "1000-2000", label: "$1000 – $2000", min: 1000, max: 2000 },
  { value: "2000-3000", label: "$2000 – $3000", min: 2000, max: 3000 },
  { value: "o3000", label: "Over $3000", min: 3000, max: Infinity },
];

const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

const FALLBACK_IMAGE = "/assets/Banner.png";

function DestinationImage({ destination }: { destination: Destination }) {
  const [src, setSrc] = useState(destination.imageUrl);

  return (
    <Image
      src={src}
      alt={destination.destinationName}
      fill
      unoptimized
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      className="object-cover"
      // Broken/removed URLs (e.g. dead Wikimedia links in the API) fall back to a
      // local asset so no card ever shows a broken image. Re-setting the same src
      // is a no-op, so a failing fallback can't loop.
      onError={() => setSrc((current) => (current === FALLBACK_IMAGE ? current : FALLBACK_IMAGE))}
    />
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-white">
      <div className="relative aspect-[16/9]">
        <DestinationImage destination={destination} />
        <span className="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-semibold text-foreground shadow-sm">
          4.5
          <Star className="h-3 w-3 fill-current text-foreground" aria-hidden="true" />
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="flex min-w-0 items-center gap-1">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{destination.country}</span>
          </span>
          <span className="shrink-0">
            <span className="text-sm font-bold text-foreground">${destination.price}</span>
            /person
          </span>
        </div>

        <h2 className="mt-2 text-base font-semibold text-foreground">{destination.destinationName}</h2>

        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {destination.duration}
        </p>

        <a
          href="#"
          className="mt-3 inline-flex items-center gap-1 text-xs font-bold tracking-wide text-brand uppercase hover:underline"
        >
          Book Now
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`The server responded with ${res.status}.`);
        }
        return res.json();
      })
      .then((data: Destination[]) => {
        if (!cancelled) {
          setDestinations(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("We couldn't load the destinations right now. Check that the booking API at localhost:8000 is running and try again.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const categories = useMemo(
    () => [...new Set(destinations.map((d) => d.category))].sort(),
    [destinations],
  );

  const activeRange = priceRanges.find((range) => range.value === priceRange);

  const filtered = useMemo(() => {
    let list = destinations.filter((destination) => {
      const matchesCategory = category === "" || destination.category === category;
      const matchesPrice = activeRange
        ? destination.price >= activeRange.min && destination.price < activeRange.max
        : true;
      return matchesCategory && matchesPrice;
    });

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      list = [...list].sort((a, b) => a.destinationName.localeCompare(b.destinationName));
    }

    return list;
  }, [destinations, category, activeRange, sort]);

  return (
    <main className="flex-1 px-4 py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-3xl text-foreground md:text-4xl">Explore All Destinations</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Find your perfect travel experience from our curated collection
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <Select value={category} onValueChange={(value) => setCategory(value ?? "")}>
            <SelectTrigger className="h-9 w-full rounded-md bg-white px-3 text-xs tracking-wide uppercase text-muted-foreground">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={(value) => setPriceRange(value ?? "")}>
            <SelectTrigger className="h-9 w-full rounded-md bg-white px-3 text-xs tracking-wide uppercase text-muted-foreground">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={(value) => setSort(value ?? "")}>
            <SelectTrigger className="h-9 w-full rounded-md bg-white px-3 text-xs tracking-wide uppercase text-muted-foreground">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Showing {filtered.length} destination{filtered.length === 1 ? "" : "s"}
        </p>

        {loading && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:mt-5 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-lg border border-border bg-white">
                <Skeleton className="aspect-[16/9] w-full rounded-none" />
                <div className="space-y-2 p-4">
                  <Skeleton className="h-3.5 w-2/3" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3.5 w-1/2" />
                  <Skeleton className="h-3.5 w-20" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button
              variant="outline"
              onClick={() => {
                setLoading(true);
                setError(null);
                setReloadKey((key) => key + 1);
              }}
            >
              <RotateCw />
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No destinations match your filters.
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:mt-5 lg:grid-cols-3">
            {filtered.map((destination) => (
              <DestinationCard key={destination._id} destination={destination} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
