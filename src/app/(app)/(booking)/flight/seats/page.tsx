import Navbar from "@/components/ui/Navbar";
import ImagePlane from "@/features/flights/shared/ImagePlane";
import { SeatPicker } from "@/features/Seats/Components/SeatPicker";
import { Suspense } from "react";
import Flight from "@/assets/images/1f333dd2b89d7ab8cf544bc5d5b4878e6d6f2f3c.png";

async function SeatPickerWrapper({
  searchParams,
}: {
  searchParams?: Promise<{ passengers?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const maxSeats = resolvedParams?.passengers ? Number(resolvedParams.passengers) : undefined;

  return <SeatPicker maxSeats={maxSeats} />;
}

export default function Page({
  searchParams,
}: {
  searchParams?: Promise<{ passengers?: string }>;
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
          <SeatPickerWrapper searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}