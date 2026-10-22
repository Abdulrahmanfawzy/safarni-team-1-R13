import Navbar from "@/components/ui/Navbar";
import ImagePlane from "@/features/flights/shared/ImagePlane";
import { SeatPicker } from "@/features/Seats/Components/SeatPicker";

export default function Page() {
  return (
    <div className="w-full flex flex-col  min-h-screen "> 
     <Navbar/>
    <main className="flex flex-col w-full max-w-7xl mx-auto items-center justify-evenly p-4 md:flex-row">
     
      <ImagePlane/>
      <SeatPicker />
    </main>
    </div>
  );
}