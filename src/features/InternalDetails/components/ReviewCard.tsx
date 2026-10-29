import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "./Format";
import { StarRating } from "./StartRating";
import { TourReview } from "../types/types";


type ReviewCardProps = {
  review: TourReview;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="space-y-2 rounded-lg border bg-background p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <Avatar className="size-7">
            {review.user_avatar && (
              <AvatarImage src={review.user_avatar} alt={review.user_name} />
            )}
            <AvatarFallback className="text-xs">
              {review.user_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-sm font-medium text-foreground">
            {review.user_name}
          </span>
        </div>

        <time
          dateTime={review.created_at}
          className="shrink-0 text-xs text-muted-foreground"
        >
          {timeAgo(review.created_at)}
        </time>
      </div>

      <StarRating rating={review.rating} />

      <p className="text-sm text-muted-foreground">{review.comment}</p>
    </article>
  );
}