import ImagePlane from "@/features/flights/shared/ImagePlane";
import { SeatPicker } from "@/features/Seats/Components/SeatPicker";
import { GetFlightSeatsAction } from "@/actions/Flights";
import { Suspense } from "react";
import Flight from "@/assets/images/1f333dd2b89d7ab8cf544bc5d5b4878e6d6f2f3c.png";

type SeatsSearchParams = {
  [key: string]: string | string[] | undefined;
};

async function SeatsContent({
  searchParams,
}: {
  searchParams?: Promise<SeatsSearchParams>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const flightId = resolvedParams.id;

  let apiSeats: any = null;
  if (flightId) {
    try {
      apiSeats = await GetFlightSeatsAction(String(flightId));
    } catch (error) {
      console.error("Failed to fetch flight seats from API:", error);
    }
  }

  return (
    <SeatPicker
      apiSeats={apiSeats}
      requestError={!flightId ? "Flight ID is missing." : undefined}
    />
  );
}

export default function SeatsPage({
  searchParams,
}: {
  searchParams?: Promise<SeatsSearchParams>;
}) {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <main className="flex flex-col w-full max-w-7xl mx-auto items-center justify-evenly p-4 md:flex-row">
        <ImagePlane image={Flight} />
        <Suspense
          fallback={
            <div className="w-full max-w-7xl rounded-md bg-white p-12 text-center text-sm text-neutral-500 shadow-sm">
              Loading seat picker...
            </div>
          }
        >
          <SeatsContent searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
