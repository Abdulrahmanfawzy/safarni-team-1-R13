"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface IProps {
  images: string[];
}

const RoomGallery = ({ images }: IProps) => {
  const firstRowImages = images.slice(0, 4);
  const carouselImages = images.slice(4);

  return (
    <div className="mt-5 min-w-0 space-y-3">
      <h3 className="text-base font-medium text-gray-900 lg:text-xl">
        Gallery <span className="text-primary">({images.length})</span>
      </h3>

      {images.length > 0 ? (
        <>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-4">
            {firstRowImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={image}
                    alt={`Hotel image ${index + 1}`}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
            ))}
          </div>

          {carouselImages.length > 0 && (
            <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="my-5 w-full min-w-0 px-1"
            >
                <CarouselContent className="-ml-2 lg:-ml-4">
                  {carouselImages.map((image, index) => (
                    <CarouselItem
                      key={`${image}-${index + firstRowImages.length}`}
                      className="basis-[72%] pl-2 sm:basis-1/2 lg:basis-1/4 lg:pl-4"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg">
                        <Image
                          src={image}
                          alt={`Hotel gallery image ${index + firstRowImages.length + 1}`}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 72vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="-left-11 hidden size-10 cursor-pointer border-none bg-gray-100 text-black lg:flex" />
                <CarouselNext className="-right-11 hidden size-10 cursor-pointer border-none bg-gray-100 text-black lg:flex" />
            </Carousel>
          )}
        </>
      ) : (
        <p className="py-6 text-sm text-gray-500">
          No photos are available for this hotel yet.
        </p>
      )}
    </div>
  );
};

export default RoomGallery;