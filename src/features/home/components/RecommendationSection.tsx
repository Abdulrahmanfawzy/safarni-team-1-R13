
"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { homeApi } from "@/api/home.api";
import { Card } from "@/components/ui/card";

export default function RecommendationSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["home", "recommendations"],
    queryFn: homeApi.getHomeFeed,
  });

  const recommendations = data?.recommendations ?? [];

  const visibleRecommendations = isExpanded
    ? recommendations
    : recommendations.slice(0, 3);

  return (
    <section>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold sm:text-xl lg:text-2xl">
          Recommendations
        </h2>

        {!isPending &&
          !isError &&
          recommendations.length > 3 && (
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              className="shrink-0 text-sm font-semibold text-(--primary) transition hover:opacity-75"
            >
              {isExpanded ? "Show less" : "View all"}
            </button>
          )}
      </div>

      {isPending && (
        <p className="py-8 text-center text-slate-500" role="status">
          Loading recommendations...
        </p>
      )}

      {isError && (
        <p className="py-8 text-center text-red-600" role="alert">
          {error instanceof Error
            ? error.message
            : "Failed to load recommendations."}
        </p>
      )}

      {!isPending && !isError && recommendations.length === 0 && (
        <p className="py-8 text-center text-slate-500">
          No recommendations right now.
        </p>
      )}

      {!isPending && !isError && recommendations.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleRecommendations.map((recommendation) => (
            <Card
              key={recommendation.id}
              className="group overflow-hidden"
            >
              <div className="p-4">
                {recommendation.cover_photo ? (
                  <Image
                    src={recommendation.cover_photo}
                    alt={recommendation.name}
                    width={320}
                    height={220}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-[220px] w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-[220px] items-center justify-center rounded-xl bg-muted">
                    <span className="text-sm text-muted-foreground">
                      No image available
                    </span>
                  </div>
                )}

                <div className="mt-3">
                  <h3 className="text-base font-semibold">
                    {recommendation.name}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {recommendation.country}
                  </p>

                  {recommendation.rating != null && (
                    <p className="mt-2 text-sm">
                      ⭐ {recommendation.rating}
                      {recommendation.reviews_count != null &&
                        ` (${recommendation.reviews_count} reviews)`}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
