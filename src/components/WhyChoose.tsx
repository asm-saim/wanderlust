import Image from "next/image";

const features = [
  {
    icon: "/assets/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/assets/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/assets/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-sky-100  px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-display text-3xl text-foreground md:text-4xl lg:text-5xl">
          Why Choose Wanderlust
        </h2>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-10 grid gap-5 text-left md:mt-12 md:grid-cols-3 md:gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg bg-white p-6 shadow-[0_2px_14px_rgba(0,0,0,0.06)] md:p-8"
            >
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="h-10 w-auto"
              />
              <h3 className="mt-5 font-display text-xl text-foreground md:text-[1.35rem]">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
