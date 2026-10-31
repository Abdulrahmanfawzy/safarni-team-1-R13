import SearchFlight from "@/features/flights/components/SearchFlight";
import { Suspense } from "react";

export default function FlightPage() {
  return (
    <Suspense fallback={<div>Loading flight search...</div>}>
      <SearchFlight />
    </Suspense>
  );
}
