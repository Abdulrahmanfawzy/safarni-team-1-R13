import { Suspense } from "react";
import RentCar from "@/features/Cars/components/RentCar"
import ImagePlane from "@/features/flights/shared/ImagePlane"
import Merc from "@/assets/images/e744f4cf979ec01abb63356b5a84a958a241a35d.png"
import RequestCarBookingDetailsAction from "@/actions/cars";
type Props = {
  params: Promise<{
    id: string;
  }>;
};
const RentNow = async({params }:Props) => {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-7xl p-8">Loading car details…</div>}>
      <CarDetails params={params} />
    </Suspense>
  );
};

const CarDetails = async ({ params }: Props) => {
  const { id } = await params;
  const { car, error } = await RequestCarBookingDetailsAction(id);

  if (!car) {
    return <div className="container mx-auto max-w-7xl p-8" role="alert">{error ?? "Car details are unavailable."}</div>;
  }
  
    return (
        <div className="w-full">
            <main className="container mx-auto max-w-7xl flex">
                <ImagePlane className="rotate-y-180" image={Merc} />
                <RentCar car={car} />
            </main>
        </div>
    )
}
export default RentNow
