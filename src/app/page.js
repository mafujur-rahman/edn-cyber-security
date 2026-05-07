import CallToAction from "@/components/pages/homePage/cta/Cta";
import Cta from "@/components/pages/homePage/cta/Cta";
import CustomerSection from "@/components/pages/homePage/Customer/Customer";
import DeepDive from "@/components/pages/homePage/DeepDive";
import EdnAbout from "@/components/pages/homePage/EdnAbout/EdnAbout";
import EdnStatistics from "@/components/pages/homePage/EdnStatistics/EdnStatics";
import EventsSection from "@/components/pages/homePage/Events";
import FAQSection from "@/components/pages/homePage/FAQ";
import CinematicHero from "@/components/pages/homePage/HeroBanner/CinematicHero";
import Hero from "@/components/pages/homePage/HeroBanner/HeroBanner";
import IntroSection from "@/components/pages/homePage/IntroSection/IntroSection";
import LanternSection from "@/components/pages/homePage/Lantern";
import PresentationSection from "@/components/pages/homePage/Presentation/Presentation";
import StandardProtection from "@/components/pages/homePage/StandardProtection/StandardProtection";
import StrategicInvestors from "@/components/pages/homePage/StrategicInvestores";
import ScrollingTestimonial from "@/components/pages/homePage/Testimonial/Testimonial";
import Footer from "@/components/shared/Footer/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* <Hero /> */}
      <CinematicHero />
      <IntroSection />
      {/* <StandardProtection /> */}
      <PresentationSection />
      <EdnStatistics />
      <CustomerSection />
      <ScrollingTestimonial />
      <StrategicInvestors />
      <CallToAction />
      <EventsSection />
      <LanternSection />
      <FAQSection />
      <DeepDive />
      <Footer />
    </div>
  );
}
