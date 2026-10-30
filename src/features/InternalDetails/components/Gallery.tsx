import Image from "next/image";
import { SectionTitle } from "./SectionTitle";
import { TourImage } from "../types/types";
import { AddTourPhotoButton } from "./AddTourPhotoButton";


type GallerySectionProps = {
  images: TourImage[];
  count: number;
  title: string;
  tourId: number;
};

export function GallerySection({ images, count, title, tourId }: GallerySectionProps) {
  return (
    <section className="space-y-3">
      <SectionTitle count={count}>Gallery</SectionTitle>

      {images?.length > 0 && (
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {images?.map((image) => (
            <li
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <Image
                src={image.url}
                alt={title}
                fill
                sizes="(min-width: 1024px) 150px, 33vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      )}

      <AddTourPhotoButton tourId={tourId} />
    </section>
  );
}
