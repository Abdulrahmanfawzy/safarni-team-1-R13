import SearchBar from "@/components/shared/SearchBar";
import SectionHeader from "../_components/SectionHeader";
import AvailableRooms from "../_components/AvailableRooms";

interface HotelDetailsPageProps {
  
}

export default async function HotelDetailsPage({}: HotelDetailsPageProps) {
  

  return (
    <section className="sm:app-container my-4 flex flex-col gap-4 ">
        <SearchBar pathname="/" />
        <SectionHeader title="available rooms" viewAllHref="" />
        <AvailableRooms />
    </section>
  );
}