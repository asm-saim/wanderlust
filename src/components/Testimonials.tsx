import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/assets/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/assets/person1.png",
  },
  {
    quote:
      "Exploring Kyoto's Temples And Traditional Gardens Felt Like Stepping Into Another Era. Every Moment Was Peaceful And Inspiring.",
    name: "Daniel Lee",
    location: "Seoul, South Korea",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    quote:
      "The Safari Adventure Was Beyond Incredible. Seeing Wildlife Up Close With Knowledgeable Guides Made It A Trip Of A Lifetime.",
    name: "Olivia Martin",
    location: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    quote:
      "From The First Booking To The Last Day, Everything Ran Smoothly. The Itinerary Balanced Adventure And Relaxation Perfectly.",
    name: "James Wilson",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80",
  },
  {
    quote:
      "The Santorini Sunset Cruise Was The Highlight Of Our Trip. Thoughtful Details Everywhere — We Would Book Again Without Hesitation.",
    name: "Emma Davis",
    location: "Melbourne, Australia",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&h=400&q=80",
  },
];

const photoSizes =
  "(min-width: 1024px) 240px, (min-width: 768px) 208px, (min-width: 640px) 176px, 144px";

export default function Testimonials() {
  return (
    <section className="bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <header className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl text-foreground md:text-4xl lg:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                Real experiences from our happy travelers
              </p>
            </div>

            {/* Positioned as static buttons in the header instead of the
                carousel's default absolute placement */}
            <div className="flex shrink-0 items-center gap-3">
              <CarouselPrevious className="relative inset-y-auto left-auto my-0 h-10 w-10 text-muted-foreground md:h-11 md:w-11">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Previous slide</span>
              </CarouselPrevious>
              <CarouselNext className="relative inset-y-auto left-auto my-0 h-10 w-10 text-muted-foreground md:h-11 md:w-11">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Next slide</span>
              </CarouselNext>
            </div>
          </header>

          <CarouselContent className="mt-8 md:mt-10">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="md:basis-1/2"
              >
                <figure className="flex h-full overflow-hidden rounded-lg border border-border bg-white shadow-[0_2px_14px_rgba(0,0,0,0.06)]">
                  <div className="flex min-w-0 flex-1 flex-col p-5 md:p-6">
                    <blockquote className="font-display text-base leading-snug text-foreground md:text-lg">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                    <figcaption className="mt-auto pt-5">
                      <p className="text-sm text-brand">
                        — {testimonial.name}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </figcaption>
                  </div>
                  <div className="relative w-36 shrink-0 sm:w-44 md:w-52 lg:w-60">
                    <Image
                      src={testimonial.image}
                      alt={`Portrait of ${testimonial.name}`}
                      fill
                      sizes={photoSizes}
                      className="object-cover"
                    />
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
