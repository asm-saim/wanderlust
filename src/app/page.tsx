import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* First fold: navbar + hero + search bar locked to exactly one viewport */}
      <div className="flex h-dvh flex-col overflow-hidden">
        <Navbar />
        <Banner />
      </div>

      {/* Everything after the fold lives in normal document scroll */}
      <WhyChoose />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}
