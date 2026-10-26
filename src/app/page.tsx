import Banner from "@/components/Banner";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <>
      {/* First fold: hero + search bar locked to the viewport below the
          layout navbar (h-16 = 4rem), so the whole screen fits without scroll */}
      <div className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden">
        <Banner />
      </div>

      {/* Everything after the fold lives in normal document scroll */}
      <WhyChoose />
      <Testimonials />
      <CallToAction />
    </>
  );
}
