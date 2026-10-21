import Image from "next/image";
// import Link from "next/link";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});
import flight from "@/assets/images/flight.jpg";
import car from "@/assets/images/car.jpg";
import tours from "@/assets/images/tours.jpg";
import hotel from "@/assets/images/hotel.jpg";

const categoryImages = [
  { id: 1, label: "Flights", alt: "", src: flight },
  { id: 2, label: "Cars", alt: "", src: car },
  { id: 3, label: "Tours", alt: "", src: tours },
  { id: 4, label: "Hotels", alt: "", src: hotel },
];

export default function Categories() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          Categories
        </h2>

        <div className="flex flex-wrap items-start  justify-between gap-9 sm:gap-10 lg:gap-14">
          {categoryImages.map((image) => (
            <div
              key={image.id}
              className="group flex w-50 shrink-0 flex-col items-center gap-10"
            >
              <div className="size-70 overflow-hidden rounded-full shadow-sm mx-5 ring-2 ring-transparent transition group-focus-visible:ring-(--primary)">
                <Image
                  src={image.src}
                  alt={image.alt || image.label}
                  width={320}
                //   height={40}
                  sizes="150px"
                  className="size-full rounded-full h-70 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h2 className={`${cairo.className} text-center text-6xl font-bold text-(--primary)`}>
                {image.label}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
