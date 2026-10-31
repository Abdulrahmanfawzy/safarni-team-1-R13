import { cn } from "cn";

interface HotelCardSkeletonProps {
  variant?: "default" | "horizontal";
}

export default function HotelCardSkeleton({
  variant = "default",
}: HotelCardSkeletonProps) {
  const isHorizontal = variant === "horizontal";

  return (
    <article
      className={cn(
        "w-full min-w-0 animate-pulse overflow-hidden rounded-2xl bg-primary-foreground p-3",
        isHorizontal
          ? "flex items-center gap-3 shadow-[0px_3.39px_13.58px_0px_#838BB41F]"
          : "shadow-[0px_0px_20px_0px_#6F6F6F40] sm:shadow-[0px_0px_26.37px_0px_#6F6F6F40]"
      )}
    >
      {/* Image skeleton */}
      <div
        className={cn(
          "shrink-0 rounded-xl bg-gray-200",
          isHorizontal
            ? "h-31 w-31 sm:h-37.5 sm:w-37.5"
            : "mx-1 aspect-4/3"
        )}
      />

      {/* Content skeleton */}
      <div className={cn("min-w-0 flex-1", !isHorizontal && "mt-3")}>
        {/* Discount and rating */}
        <div className="flex items-center justify-between gap-2">
          <div className="h-6 w-16 rounded-full bg-gray-200" />
          <div className="h-5 w-12 rounded-md bg-gray-200" />
        </div>

        {/* Hotel name */}
        <div className="mt-3 h-5 w-4/5 rounded-md bg-gray-200" />

        {/* Location */}
        <div className="mt-3 flex items-center gap-2">
          <div className="h-5 w-5 shrink-0 rounded-full bg-gray-200" />
          <div className="h-4 w-3/5 rounded-md bg-gray-200" />
        </div>
      </div>
    </article>
  );
}