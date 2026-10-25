import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative isolate flex min-h-[320px] items-center justify-center overflow-hidden px-4 py-16 md:min-h-[400px] md:py-24">
      <Image
        src="/assets/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* CTA.png ships undarkened — text legibility needs this overlay */}
      <div className="-z-10 absolute inset-0 bg-black/55" aria-hidden="true" />

      <div className="flex max-w-3xl flex-col items-center text-center">
        <h2 className="font-display text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-sm text-white/85 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <a
          href="#"
          className="mt-7 flex items-center gap-2 rounded-md bg-white px-6 py-3 text-xs font-bold uppercase tracking-wide text-foreground transition-colors hover:bg-white/90 md:px-8 md:text-sm"
        >
          Book Your Trip Today
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
