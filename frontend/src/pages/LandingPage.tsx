import { Navbar } from "../components/landing/Navbar";
import { HeroSection } from "../components/landing/HeroSection";
import { FeaturesGrid } from "../components/landing/FeaturesGrid";
import { IndustriesSection } from "../components/landing/IndustriesSection";
import { AIShowcase } from "../components/landing/AIShowcase";
import { Pricing } from "../components/landing/Pricing";
import { Footer } from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <IndustriesSection />
        <AIShowcase />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
