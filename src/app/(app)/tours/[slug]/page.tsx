import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  CalendarDays,
  Users,
  Compass,
} from "lucide-react";

import { getTourDetails } from "@/features/search-filter/api/tourDetailsApi";
import type { TourDetails } from "@/features/search-filter/types/tourDetailsTypes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ErrorState({ title, message }: { title: string; message: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <section className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>

        <p className="mt-3 text-gray-600">{message}</p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          <ArrowLeft size={18} />
          Back to home
        </Link>
      </section>
    </main>
  );
}

export default async function TourDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  console.log("slug", slug);

  let tour: TourDetails | null;

  try {
    tour = await getTourDetails(slug);
    console.log(tour);
  } catch (error) {
    console.error("Failed to load tour details:", error);

    return (
      <ErrorState
        title="Unable to load this tour"
        message="Something went wrong while loading the tour details. Please try again."
      />
    );
  }

  if (!tour) {
    return (
      <ErrorState
        title="Tour not found"
        message="We couldn't find a tour matching this URL."
      />
    );
  }

  const availableImage =
    tour.images.find((image) => image.url)?.url || (tour.image || "").trim();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-gray-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to home
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6">
            <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
              {availableImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={availableImage}
                  alt={tour.title}
                  className="h-64 w-full object-cover sm:h-96"
                />
              ) : (
                <div className="flex h-64 items-center justify-center bg-gray-200 sm:h-96">
                  <Compass size={56} className="text-gray-400" />
                </div>
              )}

              <div className="p-6 sm:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium capitalize text-blue-700">
                    {tour.adventure_style}
                  </span>

                  <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                    <MapPin size={16} />
                    {tour.location.city}, {tour.location.country}
                  </span>
                </div>

                <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                  {tour.title}
                </h1>

                <div className="mt-5 flex flex-wrap gap-5 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-2">
                    <Clock size={18} />
                    {tour.duration_text}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Star size={18} className="text-amber-500" />
                    {tour.rating} ({tour.reviews_count} reviews)
                  </span>
                </div>
              </div>
            </section>

            {tour.best_time_to_visit && (
              <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Best time to visit
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  {tour.best_time_to_visit}
                </p>
              </section>
            )}

            {tour.top_activities.length > 0 && (
              <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Top activities
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {tour.top_activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="overflow-hidden rounded-xl border border-gray-100"
                    >
                      {activity.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="h-40 w-full object-cover"
                        />
                      )}

                      <p className="p-4 font-medium text-gray-900">
                        {activity.title}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {tour.images.length > 1 && (
              <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">Gallery</h2>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  {tour.images.map((image) => (
                    <div key={image.id} className="overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.url}
                        alt={`${tour.title} gallery`}
                        className="h-40 w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-8">
            <p className="text-sm text-gray-500">Starting from</p>

            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">
                ${Number(tour.price).toFixed(2)}
              </span>

              <span className="text-sm text-gray-500">/ person</span>
            </div>

            <div className="my-6 border-t border-gray-100" />

            <h2 className="text-xl font-bold text-gray-900">
              Available schedules
            </h2>

            {tour.schedules.length > 0 ? (
              <div className="mt-4 space-y-4">
                {tour.schedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="rounded-xl border border-gray-200 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <CalendarDays
                        size={20}
                        className="mt-0.5 text-blue-600"
                      />

                      <div>
                        <p className="font-medium text-gray-900">
                          {formatDate(schedule.date)}
                        </p>

                        {schedule.end_date !== schedule.date && (
                          <p className="mt-1 text-sm text-gray-500">
                            Until {formatDate(schedule.end_date)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                      <Users size={17} />
                      <span>{schedule.available_slots} spots available</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500">
                No schedules are currently available.
              </p>
            )}

            <p className="mt-5 text-sm text-gray-500">
              {tour.gallery_count} gallery image
              {tour.gallery_count === 1 ? "" : "s"}
            </p>

            <button
              type="button"
              disabled
              className="mt-6 w-full cursor-not-allowed rounded-xl bg-gray-200 px-5 py-3 font-semibold text-gray-500"
              title="Booking is not connected yet"
            >
              Booking coming soon
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
