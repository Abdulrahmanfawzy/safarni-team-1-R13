import SearchBar from "@/components/shared/SearchBar"
import SectionHeader from "./_components/SectionHeader"
import RecommendationSection from "./_components/RecommendationSection"
import NearbySection from "./_components/NearbySection"
import HotelSearchResults from "./_components/HotelSearchResults";
interface IProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async  function  HotelPage({searchParams}:IProps) {
  const { search = "" } = await searchParams;
  return (
    <section className=" my-4 flex flex-col gap-4 ">
      <SearchBar pathname="/"  initialSearch={search}/>
         {search.trim() && (
        <HotelSearchResults search={search.trim()} />
      )}
      <SectionHeader title="Recommendation" viewAllHref="/hotel?section=recommended" />
      <RecommendationSection />
      <SectionHeader title="Nearby Hotel" viewAllHref="/hotel?section=nearby" />
      <NearbySection />
    </section>
  )
}