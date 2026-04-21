import Hero from "@/components/pages/homePage/HeroBanner/HeroBanner";
import IntroSection from "@/components/pages/homePage/IntroSection/IntroSection";
import StandardProtection from "@/components/pages/homePage/StandardProtection/StandardProtection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <IntroSection />
      {/* <StandardProtection /> */}
    </div>
  );
}
