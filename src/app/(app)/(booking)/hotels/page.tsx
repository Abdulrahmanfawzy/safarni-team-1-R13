import type { Metadata } from "next";
import SearchBar from "@/components/shared/SearchBar"
import SectionHeader from "./_components/SectionHeader"
import RecommendationSection from "./_components/RecommendationSection"
import NearbySection from "./_components/NearbySection"
import HotelSearchResults from "./_components/HotelSearchResults";
import { getHotelsMetadata } from "./metadata";

interface IProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export async function generateMetadata({ searchParams }: IProps): Promise<Metadata> {
  const { search } = await searchParams;
  return getHotelsMetadata(search);
}

export default async  function  HotelPage({searchParams}:IProps) {
  const { search = "" } = await searchParams;
  return (
    <section className="app-container my-4 flex flex-col gap-4 ">
      <SearchBar pathname="/"  initialSearch={search}/>
         {search.trim() && (
        <HotelSearchResults search={search.trim()} />
      )}
      <SectionHeader title="Recommendation" viewAllHref="/hotels" />
      <RecommendationSection />
      <SectionHeader title="Nearby Hotel" viewAllHref="/hotels" />
      <NearbySection />
    </section>
  )
}