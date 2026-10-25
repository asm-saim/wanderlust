import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar />
      <Banner />
    </div>
  );
}
