import { Suspense } from "react";
import Image from "next/image";
import RentCar from "@/features/Cars/components/RentCar"
import Merc from "@/assets/images/e744f4cf979ec01abb63356b5a84a958a241a35d.png"
import { RequestCarBookingDetailsAction } from "@/api/Cars";
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
        <div className="w-full px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
            <main className="container mx-auto flex max-w-7xl flex-col items-stretch gap-5 md:flex-row md:gap-6 lg:gap-8">
                <div className="relative min-h-[240px] w-full overflow-hidden rounded-2xl bg-light-gray sm:min-h-[320px] md:min-h-[430px] md:w-1/2 md:flex-1 md:rounded-3xl">
                  <Image
                    src={Merc}
                    alt="Rental car"
                    fill
                    priority
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-contain p-5 sm:p-8"
                  />
                </div>
                <div className="w-full min-w-0 md:w-1/2 md:flex-1">
                  <RentCar car={car} />
                </div>
            </main>
        </div>
    )
}
export default RentNow
