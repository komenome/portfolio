import { HeroSection } from "@/components/home/HeroSection";
import { GamesSection } from "@/components/home/GamesSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <GamesSection />
      <CTASection />
    </div>
  );
}
