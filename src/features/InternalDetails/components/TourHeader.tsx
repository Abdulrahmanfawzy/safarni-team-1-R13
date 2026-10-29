import { StarRating } from "./StartRating";
import type { TourDetails } from "../types/types";

type TourHeaderProps = Pick<
  TourDetails,
  | "title"
  | "rating"
  | "reviews_count"
  | "adventure_style"
  | "duration_text"
  | "location"
>;

export function TourHeader({
  title,
  rating,
  reviews_count,
  adventure_style,
  duration_text,
  location,
}: TourHeaderProps) {
  return (
    <header className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-xl font-bold text-foreground">{title}</h1>

        <div className="flex shrink-0 items-center gap-1.5">
          <StarRating rating={rating} />
          <span className="text-xs font-medium text-foreground">
            {rating?.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">
            ({reviews_count})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
        <span className="capitalize">{adventure_style}</span>
        <span className="text-center">{duration_text}</span>
        <span className="text-right">
          {location?.city}, {location?.country}
        </span>
      </div>
    </header>
  );
}