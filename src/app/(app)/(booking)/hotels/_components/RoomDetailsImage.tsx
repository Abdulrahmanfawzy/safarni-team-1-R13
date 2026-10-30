'use client'
import Image, { type ImageProps } from "next/image";
import roomImg from "@/assets/images/room-details.svg";
import { BackButton } from "@/components/shared/BackButton";
import smallImg from "@/assets/images/small-img.svg"
import { useState } from "react";
interface IProps {
  images: ImageProps["src"][];
  mobileImages: ImageProps["src"][];
}
export default function RoomDetailsImage({ images, mobileImages }: IProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mobileSelectedIndex, setMobileSelectedIndex] = useState(0);
  const displayImages = images.slice(0, 4);
  const selectedImage = images[selectedIndex] || roomImg;
  const remainingImages = Math.max(images.length - 4, 0);
  const mobileSelectedImage =
    mobileImages[mobileSelectedIndex] || mobileImages[0] || selectedImage;
  const mobileThumbnails = mobileImages.slice(0, 5);
  return (
    <>
      <section className="relative hidden items-center justify-center lg:flex lg:w-fit lg:shrink-0 lg:flex-col lg:pr-0">
        <div className="absolute left-9 top-3 cursor-pointer">
          <BackButton />
        </div>
        <Image
          src={selectedImage}
          alt="Room details illustration"
          width={508}
          height={602}
          priority
          className=" mt-19 ml-8 h-[602px]! w-[508px]! object-cover rounded-20  "
        />
        {images.length > 0 && (
          <div className="absolute bottom-2.5 z-10 flex items-center gap-2 rounded-20 bg-white p-4 shadow-[0px_2px_8px_0px_#838BB41F]">
            {displayImages.map((image, index) => {
              const isLastThumbnail = index === 3;
              const showRemaining = isLastThumbnail && remainingImages > 0;
              return (
                <button
                  key={`${index}`}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Show room image ${index + 1}`}
                  aria-pressed={selectedIndex === index}
                  className={`relative h-21.25 w-21.25 shrink-0 overflow-hidden rounded-lg ${selectedIndex === index
                    ? "ring-2 ring-primary"
                    : ""
                    }`}
                >
                  <Image
                    src={image || smallImg}
                    alt={`Room thumbnail ${index + 1}`}
                    fill
                    sizes="85px"
                    className="object-cover"
                  />
                  {showRemaining && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-lg font-medium text-white">
                      +{remainingImages}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </section>

      <section className="block w-full px-0 lg:hidden" aria-label="Room photos">
        <div className="relative aspect-[1.62] w-full overflow-hidden bg-gray-100">
          <Image
            src={mobileSelectedImage}
            alt="Hotel room"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute left-3 top-3 rounded-full bg-white/90 shadow-sm">
            <BackButton />
          </div>
        </div>

        {mobileThumbnails.length > 0 && (
          <div className="relative z-10 mx-4 -mt-7 flex items-center gap-1.5 rounded-xl bg-white p-2 shadow-[0px_2px_8px_0px_#838BB41F] sm:mx-6 sm:-mt-8 sm:gap-2 sm:p-2.5">
            {mobileThumbnails.map((image, index) => {
              const showMorePhotos = index === mobileThumbnails.length - 1;
              return (
                <button
                  key={`mobile-${index}`}
                  type="button"
                  onClick={() => setMobileSelectedIndex(index)}
                  aria-label={
                    showMorePhotos
                      ? "Show room photo 5 and more photos"
                      : `Show room photo ${index + 1}`
                  }
                  aria-pressed={mobileSelectedIndex === index}
                  className={`relative h-12 min-w-0 flex-1 overflow-hidden rounded-md sm:h-14 ${
                    mobileSelectedIndex === index ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 18vw, 16vw"
                    className="object-cover"
                  />
                  {showMorePhotos && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-medium text-white">
                      +10
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
