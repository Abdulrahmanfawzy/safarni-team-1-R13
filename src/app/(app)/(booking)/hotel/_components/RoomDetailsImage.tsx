'use client'
import Image from "next/image";
import roomImg from "@/assets/images/room-details.svg";
import { BackButton } from "@/components/shared/BackButton";
import smallImg from "@/assets/images/small-img.svg"
import { useState } from "react";
interface IProps {
  images: string[];
}
export default function RoomDetailsImage({ images }: IProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const displayImages = images.slice(0, 4);
  const selectedImage = images[selectedIndex] || roomImg;
  const remainingImages = Math.max(images.length - 4, 0);
  return (
    <section className="relative hidden items-center justify-center  lg:flex lg:flex-col lg:pr-0">
      <div className="absolute left-9 top-3 cursor-pointer">
        <BackButton />
      </div>
      {/* Main Image--------------------------------------------------- */}
      <Image
        src={selectedImage}
        alt="Room details illustration"
        width={508}
        height={602}
        priority
        className="object-contain mt-19 ml-8"
      />
      {/* thumnails------------------------------------------------------ */}
      {images.length > 0 && (
        <div className="absolute bottom-2.5 z-10 flex items-center gap-2 rounded-20 bg-white p-4 shadow-[0px_2px_8px_0px_#838BB41F]">
          {displayImages.map((image, index) => {
            const isLastThumbnail = index === 3;
            const showRemaining = isLastThumbnail && remainingImages > 0;
            return (
              <button key={`${image}-${index}`}
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
  );
}
