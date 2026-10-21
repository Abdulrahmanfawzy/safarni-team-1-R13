import AvailableToursSection from "@/features/home/components/AvailableToursSection";
import Categories from "@/features/home/components/Categories";
import HeroSection from "@/features/home/components/HeroSection";
import RecommendationSection from "@/features/home/components/RecommendationSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Categories />
      <RecommendationSection />
      <AvailableToursSection />
    </main>
  );
}