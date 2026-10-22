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
import Link from "next/link";

const categoryImages = [
  { id: 1, label: "flights", alt: "", src: flight },
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

        <div   className="
    flex flex-col items-center gap-4 px-4 pb-4
    sm:grid sm:grid-cols-2 sm:justify-items-center sm:gap-5
    lg:grid-cols-4">
          {categoryImages.map((image) => (
            <Link href={`/${image.label}`}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
