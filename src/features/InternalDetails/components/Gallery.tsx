import Image from "next/image";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "./SectionTitle";
import { TourImage } from "../types/types";


type GallerySectionProps = {
  images: TourImage[];
  count: number;
  title: string;
};

export function GallerySection({ images, count, title }: GallerySectionProps) {
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

      <div className="flex justify-center">
        <Button variant="ghost" size="sm" className="gap-1.5 text-primary">
          <Camera className="size-4" />
          Add photo
        </Button>
      </div>
    </section>
  );
}