"use client";

import Image from "next/image";

interface IProps {
  images: string[];
}

const RoomGallery = ({ images }: IProps) => {
  return (
    <div className="mt-5 min-w-0 space-y-3">
      <h3 className="text-base font-medium text-gray-900 lg:text-xl">
        Gallery <span className="text-primary">({images.length})</span>
      </h3>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3 lg:gap-4">
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative aspect-square overflow-hidden rounded-lg"
            >
                <Image
                  src={image}
                  alt={`Hotel photo ${index + 1}`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
          ))}
        </div>
      ) : (
        <p className="py-6 text-sm text-gray-500">
          No photos are available for this hotel yet.
        </p>
      )}
    </div>
  );
};

export default RoomGallery;