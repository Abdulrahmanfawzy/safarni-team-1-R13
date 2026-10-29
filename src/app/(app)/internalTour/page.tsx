import { InternalTour } from "@/actions/internalTour";
import TourCard from "@/components/ui/tourCard";
import SearchBar from "@/features/search-filter/components/SearchBar";

type InternalTourSummary = {
    id: number;
    image: string | null;
    title: string;
    adventure_style: string;
    rating: number | null;
    duration_text: string;
    price: string | number;
};

export default async function InternalTourPage() {
    const result = await InternalTour() as { data?: { items?: InternalTourSummary[] } };
    const tours = result.data?.items ?? [];

    return (
        <section className="w-full ">
            <SearchBar />
         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
               {tours.map((tour) => (
                   <TourCard key={tour.id} tour={{ ...tour, price: Number(tour.price) }} />
               ))}
         </div>
             
        </section>
    );
}
