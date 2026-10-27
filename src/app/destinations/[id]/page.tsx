"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Pencil,
  RotateCw,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "@/components/ui/toast";
import DestinationDetailSkeleton from "@/components/DestinationDetailSkeleton";
import UpdatePackageModal from "@/components/UpdatePackageModal";

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

type LoadError = { message: string; retryable: boolean };

const FALLBACK_IMAGE = "/assets/Banner.png";

const highlights = [
  "Handpicked premium accommodation",
  "Expert local guide throughout",
  "Curated cultural experiences",
  "Airport transfers included",
  "Flexible booking options",
  "Small-group departures",
];

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

function formatDate(value: string) {
  if (!value) {
    return "your selected date";
  }
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function HeroImage({ destination }: { destination: Destination }) {
  const [src, setSrc] = useState(destination.imageUrl);

  return (
    <Image
      src={src}
      alt={destination.destinationName}
      fill
      unoptimized
      sizes="(min-width: 1280px) 1152px, 100vw"
      className="object-cover"
      // Dead URLs (e.g. the API's broken Wikimedia links) fall back to a local
      // asset so the hero never renders broken. Re-setting the same src is a
      // no-op, so a failing fallback can't loop.
      onError={() => setSrc((current) => (current === FALLBACK_IMAGE ? current : FALLBACK_IMAGE))}
    />
  );
}

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<LoadError | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [date, setDate] = useState("");
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`http://localhost:8000/destination/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status === 404 ? "not-found" : `status-${res.status}`);
        }
        return res.json();
      })
      .then((data: Destination) => {
        if (cancelled) {
          return;
        }
        if (!data || typeof data !== "object" || !data.destinationName) {
          setError({
            message: "We couldn't find that destination — it may have been removed.",
            retryable: false,
          });
        } else {
          setDestination(data);
          setDate(data.departureDate);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) {
          return;
        }
        const notFound = err instanceof Error && err.message === "not-found";
        setError({
          message: notFound
            ? "We couldn't find that destination — it may have been removed."
            : "We couldn't load this destination. Check that the booking API at localhost:8000 is running and try again.",
          retryable: !notFound,
        });
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, reloadKey]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  };

  const handleBookNow = () => {
    toast.add({
      type: "success",
      title: "Booking started! 🎉",
      description: `${destination?.destinationName ?? "Your trip"} for ${formatDate(date)} — we'll email you the confirmation shortly.`,
    });
  };

  return (
    <main className="flex-1 px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setEditOpen(true)}>
              <Pencil />
              Edit
            </Button>
            <Button
              variant="outline"
              className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
              render={<Link href="/destinations" />}
            >
              <X />
              Cancel
            </Button>
          </div>
        </div>

        {loading && <DestinationDetailSkeleton />}

        {!loading && error && (
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-muted-foreground">{error.message}</p>
            <div className="flex gap-3">
              {error.retryable && (
                <Button variant="outline" onClick={handleRetry}>
                  <RotateCw />
                  Try Again
                </Button>
              )}
              <Button variant="outline" render={<Link href="/destinations" />}>
                <ArrowLeft />
                Back to Destinations
              </Button>
            </div>
          </div>
        )}

        {!loading && !error && destination && (
          <>
            <div className="relative mt-6 aspect-[5/2] overflow-hidden rounded-xl">
              <HeroImage key={destination.imageUrl} destination={destination} />
            </div>

            <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1fr)_300px]">
              <div>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {destination.country}
                </p>

                <h1 className="mt-1 font-display text-4xl text-foreground md:text-5xl">
                  {destination.destinationName}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-current text-green-600" aria-hidden="true" />
                    <span className="font-semibold text-foreground">4.9</span>
                    <span className="text-muted-foreground">(234 reviews)</span>
                  </span>
                  <span className="h-4 w-px bg-border" aria-hidden="true" />
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    {destination.duration.replace(/\//g, " / ")}
                  </span>
                </div>

                <section className="mt-8">
                  <h2 className="text-base font-semibold text-foreground">Overview</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {destination.description}
                  </p>
                </section>

                <section className="mt-6">
                  <h2 className="text-base font-semibold text-foreground">Highlights</h2>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <aside className="rounded-xl border border-border bg-white p-5">
                <p className="text-xs text-muted-foreground">Starting from</p>
                <p className="mt-1 text-3xl font-bold text-foreground">${destination.price}</p>
                <p className="text-xs text-muted-foreground">/per person</p>

                <input
                  type="date"
                  aria-label="Departure date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="mt-4 h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20"
                />

                <Button
                  className="mt-4 h-10 w-full bg-brand text-white hover:bg-brand/90"
                  onClick={handleBookNow}
                >
                  Book Now
                  <ArrowRight />
                </Button>

                <ul className="mt-4 space-y-2">
                  {perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 shrink-0 text-green-600" aria-hidden="true" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </>
        )}
      </div>

      {editOpen && destination && (
        <UpdatePackageModal
          destination={destination}
          onOpenChange={setEditOpen}
          onUpdated={() => setReloadKey((key) => key + 1)}
        />
      )}

      <Toaster />
    </main>
  );
}
