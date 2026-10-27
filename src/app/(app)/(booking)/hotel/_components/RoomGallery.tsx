"use client";

import Image from "next/image";
import galleryImgO from '@/assets/images/gallery-1.svg'
import galleryImgT from '@/assets/images/gallery-2.svg'
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface IProps { }
const galleryImages = [
  galleryImgO,
  galleryImgT,
  galleryImgO,
  galleryImgT,
  galleryImgO,
  galleryImgT,
  galleryImgO,
  galleryImgT,
   galleryImgO,
];
const RoomGallery = ({ }: IProps) => {
  return (
    <div className="mt-5 min-w-0 space-y-3">
      <span className='text-base font-medium text-gray-900 lg:text-xl'>Gallery<span className="text-primary">(200)</span></span>
      
       {/* first row gallery------------------------------ */}
        <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-4">
          {galleryImages.slice(0,4).map((image, index) => (
            <div key={index}
              className="relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={image}
                alt={`Hotel image ${index + 1}`}
                fill
                sizes="w-[115px] h-[115px]"
                className="object-cover"
              />
            </div>
          ))

          }
        </div>
      {/* Gallery carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="my-5 w-full min-w-0 px-1"
      >
       
        <CarouselContent className="-ml-2 lg:-ml-4">
          {galleryImages.slice(4).map((image, index) => (
            <CarouselItem
              key={index}
              className="basis-[72%] pl-2 sm:basis-1/2 lg:basis-1/4 lg:pl-4"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={`Hotel gallery image ${index + 5}`}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-11 hidden size-10 cursor-pointer border-none bg-gray-100 text-black lg:flex" />
        <CarouselNext className="-right-11 hidden size-10 cursor-pointer border-none bg-gray-100 text-black lg:flex" />
      </Carousel>
      

    </div>
  )
}

export default RoomGallery