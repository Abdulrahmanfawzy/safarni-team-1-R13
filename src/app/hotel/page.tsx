import SearchBar from "@/components/shared/SearchBar"
import SectionHeader from "./_components/SectionHeader"
import RecommendationSection from "./_components/RecommendationSection"

export default function HotelPage() {
  return (
    <section className="app-container mt-3 flex flex-col gap-4 ">
      <SearchBar pathname="/" />
      <SectionHeader title="Recommendation" viewAllHref="/hotel" />
      <RecommendationSection />
    </section>
  )
}