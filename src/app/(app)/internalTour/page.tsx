import { InternalTour } from "@/actions/internalTour";
import TourCard from "@/components/ui/tourCard";
import SearchBar from "@/features/search-filter/components/SearchBar";
import { Suspense } from "react";

export default async function InternalTourPage() {
    const { data } = await InternalTour()
    console.log(data);

    return (
        <section className="w-full ">
            <SearchBar />
         <div className="grid grid-cols-1 mt-5 gap-3 md-grid-cols-2 lg:grid-cols-4">
               {
                    data?.items?.map((item) => {
                       return <TourCard tour={item} key={item.id} />
                    })
                }
                </div>       
             
        </section>
    );
}