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
    <div className="mt-5 space-y-3">
      <span className='text-gray-900 font-medium text-xl  '>Gallery<span className="text-primary">(200)</span></span>
      
       {/* first row gallery------------------------------ */}
        <div className="mt-5 grid grid-cols-4 gap-4">
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
        className="my-5 w-full"
      >
       
        <CarouselContent className="-ml-4">
          {galleryImages.slice(4).map((image, index) => (
            <CarouselItem
              key={index}
              className="basis-1/4 pl-4"
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

        <CarouselPrevious className="-left-11 size-10 text-black bg-gray-100 border-none cursor-pointer" />
        <CarouselNext className="-right-11 size-10 text-black bg-gray-100 border-none  cursor-pointer" />
      </Carousel>
      {/* price & button----------------------------------------------- */}
      <div className="flex flex-col gap-4 mt-4">
        <h4 className='text-[#111928] text-xl'>Total Price :
          <span className="text-[#1E429F] text-2xl font-semibold ">$ 150</span>
          <span className="text-[#606369] text-base ">/night</span>
        </h4>
        <Button className='h-14!'>Book Now</Button>
      </div>

    </div>
  )
}

export default RoomGallery