"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "./ReviewCard";
import { SectionTitle } from "./SectionTitle";
import { TourReview } from "../types/types";

const PAGE_SIZE = 4;

type ReviewsSectionProps = {
  reviews: TourReview[];
};

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  return (
    <section className="space-y-3">
      <SectionTitle>Reviews</SectionTitle>

      {reviews.length === 0 ? (
        <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          No reviews yet. Be the first to share your experience.
        </p>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {reviews.slice(0, visible).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {visible < reviews.length && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="w-full sm:w-64"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
              >
                See More
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}