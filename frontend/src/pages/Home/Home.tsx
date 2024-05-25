import FeaturesSection from "./FeatureSection/FeaturesSection";
import HeroSection from "./HeroSection";
import Form from "../Sign-up/ProfileForm";
import HomeNav from "./HomeNav";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useProfile } from "../../state/store";
import { features } from "./data";

export default function HomePage() {
  const navigate = useNavigate();
  const currentProfile = useProfile((state) => state.currentProfile);
  if (currentProfile) {
    navigate("/feed");
  }

  return (
    <div className="overflow-hidden ">
      <HomeNav />
      <HeroSection  />
      <FeaturesSection features={features} />
    </div>
  );
}
