import { Skeleton } from "@heroui/react";

function DateOptionsSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton
        animationType="pulse"
        className="h-4 w-20 rounded bg-gray-200"
      />
      <div className="max-h-29 overflow-hidden pr-2">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton
              key={index}
              animationType="pulse"
              className="min-h-12 rounded-md border border-gray-100 bg-gray-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RoomBookingSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading available dates"
      className="space-y-5"
    >
      <DateOptionsSkeleton />
      <DateOptionsSkeleton />
    </div>
  );
}
