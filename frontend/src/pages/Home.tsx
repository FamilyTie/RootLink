import FeaturesSection from "../components/layout/FeaturesSection";
import HeroSection from "../components/layout/HeroSection";
import HomeNav from "../components/ui/HomeNav";

export default function HomePage() {
  
  return (
    <div className="overflow-hidden">
     <HomeNav />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
