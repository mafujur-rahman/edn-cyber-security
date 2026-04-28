import Cta from "@/components/pages/homePage/cta/Cta";
import EdnAbout from "@/components/pages/homePage/EdnAbout/EdnAbout";
import Hero from "@/components/pages/homePage/HeroBanner/HeroBanner";
import IntroSection from "@/components/pages/homePage/IntroSection/IntroSection";
import StandardProtection from "@/components/pages/homePage/StandardProtection/StandardProtection";
import Footer from "@/components/shared/Footer/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <IntroSection />
      {/* <StandardProtection /> */}
      <EdnAbout />
      <Cta />
      <Footer />
    </div>
  );
}
