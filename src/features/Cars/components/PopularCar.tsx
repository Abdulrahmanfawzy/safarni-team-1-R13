import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { CarListItem } from "@/api/Cars";
import CarFallbackImage from "@/assets/images/e744f4cf979ec01abb63356b5a84a958a241a35d.png";

export default function PopularCar({
  cars,
  errorMessage,
}: {
  cars: CarListItem[];
  errorMessage?: string;
}) {

  return (
    <section className="mt-6">
      <h1 className="mb-4 text-[23px] font-medium text-gray-800">Popular Cars</h1>

      {errorMessage ? (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : cars.length === 0 ? (
        <p className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600">
          No cars are available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {cars.map((car) => {
            const image = car.brand.image || car.brand.image?.[0] || CarFallbackImage;
            const carName = [car.brand?.name, car.model].filter(Boolean).join(" ");

            return (
              <article
                className="flex w-full flex-col gap-4 rounded-md border border-gray-200 px-4 py-3 shadow-2xs"
                key={car.id}
              >
                <div className="flex items-end justify-between gap-3">
                  <h2 className="pl-3 text-[20px] font-medium text-gray-800">{carName}</h2>
                  <Image
                    src={image}
                    alt={carName || "Rental car"}
                    width={233}
                    height={187}
                    className="rotate-y-180 object-contain"
                    unoptimized={typeof image === "string"}
                  />
                </div>

                <div className="flex justify-between gap-4 px-3 text-[15px] text-gray-500">
                  <p>{car.body_type}</p>
                  <p>{car.seats_count} seats</p>
                  <p>{car.transmission}</p>
                </div>

                <div className="flex justify-between gap-4 px-3 text-sm text-gray-700">
                  <p>{car.fuel_type}</p>
                  <p>{car.hourly_rent} / hour</p>
                  <p>{car.daily_rent} / day</p>
                </div>

                <div className="flex w-full gap-4">
                  <Link href={`/cars/${car.id}`} className="w-1/2">
                    <Button variant="primary" size="lg" className="w-full">
                      Rent Now
                    </Button>
                  </Link>
                  <Link href={`/cars/${car.id}}`} className="w-1/2">
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
