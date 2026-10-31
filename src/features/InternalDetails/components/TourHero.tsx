import Image from "next/image";

type TourHeroProps = {
  image: string | null;
  title: string;
};

export function TourHero({ image, title }: TourHeroProps) {
  return (
    <div className="relative aspect-[16/7] w-full overflow-hidden rounded-xl bg-muted">
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 960px, 100vw"
          className="object-cover"
        />
      )}
    </div>
  );
}