import Image from "next/image";
import { cn } from "@/lib/utils";

import imageOne from "@/assets/images/image-1.jpg";
import imageTwo from "@/assets/images/image-2.jpg";
import imageThree from "@/assets/images/image-3.jpg";
import imageFour from "@/assets/images/image-4.jpg";
import imageFive from "@/assets/images/image-5.jpg";

/**
 * Staggered collage: two columns of two images, plus one tall image on the right.
 * Each tile is placed explicitly on the grid, so the order here is only the DOM order.
 */
const heroImages = [
  { src: imageOne,   alt: "Beautiful travel destination",        className: "col-start-1 row-start-1 -translate-y-4 rounded-r-lg  rounded-b-lg" },
  { src: imageTwo,   alt: "Travel and nature",                   className: "col-start-1 row-start-2" },
  { src: imageThree, alt: "Scenic landscape",                    className: "col-start-2 row-start-1 h-50 translate-y-18 rounded-l-lg" },
  { src: imageFour,  alt: "Beautiful place to explore",          className: "col-start-2 row-start-2 h-40 translate-y-14" },
  { src: imageFive,  alt: "Destination for your next adventure", className: "col-start-3 row-span-2 row-start-1 h-60 w-25 rounded-l-lg translate-y-50" },
];

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Hero content */}
      <div className="flex flex-col gap-6">
  <h1 className="text-4xl leading-tight font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
    Visit The Most <br className="hidden sm:block" />
    <span className="text-(--primary)">Beautiful Places</span> In{" "}
    <svg
      viewBox="0 0 40 40"
      className="ml-2 inline-block size-8 text-(--primary)"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.5}
      
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6c10-2 22 2 22 10s-14 6-12-1 14-6 16 6c1 6-4 12-10 14" />
      <path d="M26 33l2 4 4-3" />
    </svg>
    <br className="hidden sm:block" />
    The World
  </h1>

  <p className="max-w-sm text-lg leading-7 text-gray-500">
    "Explore stunning destinations around the globe. Find travel inspiration,
    discover top attractions, and plan your next adventure — all from one
    platform."
  </p>
</div>

     {/* Hero image collage */}
<div className="grid h-80 grid-cols-[1.2fr_1fr_0.8fr] grid-rows-2 gap-3 pr-1 sm:h-96 lg:h-[28rem]">
  {heroImages.map((image, index) => (
    <div
      key={image.alt}
      className={cn("relative h-full w-full overflow-hidden rounded-2xl shadow-md", image.className)}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={index < 2}
        sizes="(max-width: 1024px) 45vw, 260px"
        className="object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  ))}
</div>
      </div>
    </section>
  );
}
