import { Suspense } from "react";
import SearchBar from "@/components/shared/SearchBar";
import SectionHeader from "../_components/SectionHeader";
import AvailableRooms from "../_components/AvailableRooms";
import { getAvailableHotelRoomsMetadata } from "../metadata";

type HotelDetailsPageProps = {
  params: Promise<{
    hotelId: string;
  }>;
};

export async function generateMetadata() {
  return getAvailableHotelRoomsMetadata();
}

export default function HotelDetailsPage({ params }: HotelDetailsPageProps) {
  return (
    <Suspense fallback={<p className="app-container py-6">Loading rooms...</p>}>
      <HotelRooms params={params} />
    </Suspense>
  );
}

async function HotelRooms({ params }: HotelDetailsPageProps) {
  const { hotelId } = await params;

  return (
    <section className="app-container my-4 flex flex-col gap-4">
        <SearchBar pathname="/" />
        <SectionHeader title="available rooms" viewAllHref="" />
        <AvailableRooms hotelId={hotelId} />
    </section>
  );
}