import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { CarListItem } from "@/app/(app)/profile/types/cars.types";
import CarFallbackImage from "@/assets/images/e744f4cf979ec01abb63356b5a84a958a241a35d.png";

export default function PopularCar({
  cars,
  errorMessage,
}: {
  cars: CarListItem[];
  errorMessage?: string;
}) {

  return (
    <section className="mt-7 sm:mt-10">
      <h2 className="mb-4 text-xl font-medium text-gray-800 sm:text-[23px]">Popular Cars</h2>

      {errorMessage ? (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : cars.length === 0 ? (
        <p className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600">
          No cars are available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">

          {cars.map((car) => {
            const image = car.images[0] || car.image || CarFallbackImage;
            const carName = [car.brand?.name, car.model].filter(Boolean).join(" ");

            return (
              <article
                className="flex min-w-0 w-full flex-col gap-3 overflow-hidden rounded-xl border border-gray-200 p-3 shadow-2xs sm:gap-4 sm:p-4"
                key={car.id}
              >
                <div className="flex min-h-28 items-center justify-between gap-2 sm:min-h-36">
                  <h3 className="min-w-0 flex-1 break-words text-lg font-medium text-gray-800 sm:pl-2 sm:text-xl">{carName}</h3>
                  <Image
                    src={image}
                    alt={carName || "Rental car"}
                    width={233}
                    height={187}
                    className="h-28 w-[46%] max-w-[233px] rotate-y-180 object-contain sm:h-36"
                    unoptimized={typeof image === "string"}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 px-1 text-center text-xs text-gray-500 sm:px-3 sm:text-sm">
                  <p className="break-words">{car.body_type}</p>
                  <p>{car.seats_count} seats</p>
                  <p className="break-words">{car.transmission}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 px-1 text-center text-xs text-gray-700 sm:px-3 sm:text-sm">
                  <p className="break-words">{car.fuel_type}</p>
                  <p>{car.hourly_rent} / hour</p>
                  <p>{car.daily_rent} / day</p>
                </div>

                <div className="grid w-full grid-cols-2 gap-2 sm:gap-4">
                  <Link href={`/cars/${car.id}`} className="min-w-0">
                    <Button variant="primary" size="lg" className="w-full">
                      Rent Now
                    </Button>
                  </Link>
                  <Link href={`/cars/${car.id}`} className="min-w-0">
                    <Button
                      variant="default"
                      className="w-full border border-primary bg-transparent text-primary hover:bg-gray-200"
                      size="lg"
                    >
                      Details
                    </Button>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
