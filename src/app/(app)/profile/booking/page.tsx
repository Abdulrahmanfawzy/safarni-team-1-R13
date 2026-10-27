



import { Suspense } from "react";

import Flight from "../_components/Flight/page";
import Cars from "../_components/cars/page";
import GoBack from "@/components/shared/GoBack/page";
import BookingTabs from "../_components/bookingtabs/page";
import Hotel from "@/app/(app)/profile/_components/hotel/page";
import Tour from "../_components/tours/page";

export default function BookingPage() {
  return (
    <main>
      <GoBack />

      <div className="py-6">
        <h1 className="text-center">My Booking</h1>

        <BookingTabs
          flight={
            <Suspense fallback={<p className="p-6 text-center">Loading flight bookings...</p>}>
              <Flight />
            </Suspense>
          }
          cars={<Cars />}
          tours={
            <Tour
              
           
            />
          }
          hotel={
            <Hotel
            
            />
          }
        />
      </div>
    </main>
  );
}
