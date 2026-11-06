import { Skeleton } from "@heroui/react";

export default function RoomCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="flex w-full min-w-0 animate-pulse flex-col gap-4 overflow-hidden rounded-3xl bg-primary-foreground p-4 shadow-[0px_0px_26.37px_0px_#6F6F6F40]"
    >
      <Skeleton
        animationType="pulse"
        className="aspect-4/3 w-full shrink-0 rounded-lg bg-gray-200"
      />
      <div className="flex flex-col gap-3">
        <Skeleton
          animationType="pulse"
          className="h-6 w-3/4 rounded-md bg-gray-200"
        />
        <Skeleton
          animationType="pulse"
          className="h-5 w-4/5 rounded-md bg-gray-200"
        />
        <Skeleton
          animationType="pulse"
          className="h-4 w-full rounded-md bg-gray-200"
        />
      </div>
    </article>
  );
}
