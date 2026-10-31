import { SquarePen, Star } from "lucide-react"
import { Button } from "@/components/ui/button";
interface IProps {
  rating: number;
  totalReviews: number;
  onAddReview: () => void;
}

const RoomReview = ({ rating, totalReviews, onAddReview }: IProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4 flex items-center justify-between gap-3">
        <h3 className="text-base font-medium text-gray-900 lg:text-xl">
          Guest reviews
        </h3>
        <Button variant="ghost" onClick={onAddReview}
          className="flex h-auto shrink-0 items-center gap-1.5 p-1 text-xs font-medium text-primary hover:bg-transparent sm:text-sm lg:p-0 lg:text-lg">
          <SquarePen />
          Add review
        </Button>
      </div>

      {totalReviews > 0 ? (
        <div className="flex flex-col gap-2 rounded-xl bg-gray-50 p-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={18}
                  className={
                    index < Math.round(rating)
                      ? "fill-[#FCBA42] text-[#FCBA42]"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="font-semibold text-gray-900">
              {rating.toFixed(1)} / 5
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}.
          </p>
          <p className="text-sm text-gray-500">
            Individual review details are not available yet.
          </p>
        </div>
      ) : (
        <p className="py-6 text-sm text-gray-500">
          No guest reviews yet. Be the first to share your experience.
        </p>
      )}
    </div>
  )
}

export default RoomReview