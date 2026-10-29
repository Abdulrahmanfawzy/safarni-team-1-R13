import type { Metadata } from "next";
import { BestTimeToVisit } from "@/features/InternalDetails/components/BestVisit";
import { BookingBar } from "@/features/InternalDetails/components/BookingBar";
import { GallerySection } from "@/features/InternalDetails/components/Gallery";
import { ReviewsSection } from "@/features/InternalDetails/components/ReviewSection";
import { TopActivities } from "@/features/InternalDetails/components/TopActivates";
import { TourHeader } from "@/features/InternalDetails/components/TourHeader";
import { TourHero } from "@/features/InternalDetails/components/TourHero"
import { GetTourById } from "@/actions/internalTour";

type PageProps = {
  params: Promise<{ id: string | number  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const tour = await GetTourById(id);
  return { title: tour.title };
}

export default async function TourDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const {data:tour} = await GetTourById(id);

  return (
    <>
      <main className=" space-y-6 px-4 pb-28 pt-4">
        <TourHero image={tour.image} title={tour.title} />

        <TourHeader
          title={tour.title}
          rating={tour.rating}
          reviews_count={tour.reviews_count}
          adventure_style={tour.adventure_style}
          duration_text={tour.duration_text}
          location={tour.location}
        />

        <TopActivities activities={tour.top_activities} />
        <BestTimeToVisit text={tour.best_time_to_visit} />
        <GallerySection
          images={tour.images}
          count={tour.gallery_count}
          title={tour.title}
        />
        <ReviewsSection reviews={tour.reviews} />
      </main>

      <BookingBar slug={tour.slug} price={tour.price} />
    </>
  );
}