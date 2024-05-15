import FeaturesSection from "../components/layout/FeaturesSection";
import HeroSection from "../components/layout/HeroSection";
import Form from "../components/layout/ProfileForm";
import HomeNav from "../components/layout/HomeNav";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function HomePage() {
  const navigate = useNavigate();
  // const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="overflow-hidden">
      <HomeNav />
      <HeroSection />
      <FeaturesSection />
      <div className="h-screen w-screen"></div>
    </div>
  );
}
