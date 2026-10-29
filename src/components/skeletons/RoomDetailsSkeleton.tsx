import { Skeleton } from "@heroui/react";

export default function RoomDetailsSkeleton() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading room details"
      className="my-3.5 flex w-full flex-col gap-8 max-lg:my-0! max-lg:px-0! lg:flex-row lg:items-start lg:justify-between"
    >
      <section className="relative hidden items-center justify-center lg:flex lg:w-fit lg:shrink-0 lg:flex-col lg:pr-0">
        <Skeleton
          animationType="pulse"
          className="mt-19 ml-8 h-[602px] w-[508px] rounded-20 bg-gray-200"
        />
        <div className="absolute bottom-2.5 z-10 flex items-center gap-2 rounded-20 bg-white p-4 shadow-[0px_2px_8px_0px_#838BB41F]">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton
              key={index}
              animationType="pulse"
              className="size-21.25 rounded-lg bg-gray-200"
            />
          ))}
        </div>
      </section>

      <section className="block w-full lg:hidden" aria-hidden="true">
        <Skeleton
          animationType="pulse"
          className="aspect-[1.62] w-full bg-gray-200"
        />
        <div className="relative z-10 mx-4 -mt-7 flex items-center gap-1.5 rounded-xl bg-white p-2 shadow-[0px_2px_8px_0px_#838BB41F] sm:mx-6 sm:-mt-8 sm:gap-2 sm:p-2.5">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton
              key={index}
              animationType="pulse"
              className="h-12 min-w-0 flex-1 rounded-md bg-gray-200 sm:h-14"
            />
          ))}
        </div>
      </section>

      <section className="mt-18 mr-8 ml-8 flex w-full min-w-0 flex-1 flex-col justify-start gap-6 max-lg:mx-0 max-lg:mt-4 max-lg:gap-4 max-lg:px-4 max-lg:pb-24">
        <div className="flex items-start justify-between gap-4">
          <Skeleton
            animationType="pulse"
            className="h-9 w-24 rounded-20 bg-gray-200"
          />
          <Skeleton
            animationType="pulse"
            className="h-5 w-32 rounded-md bg-gray-200"
          />
        </div>

        <div className="space-y-3">
          <Skeleton
            animationType="pulse"
            className="h-6 w-3/4 rounded-md bg-gray-200"
          />
          <Skeleton
            animationType="pulse"
            className="h-5 w-2/3 rounded-md bg-gray-200"
          />
        </div>

        <div className="w-full">
          <div className="flex h-10 items-start gap-6 border-b border-gray-200 max-lg:grid max-lg:grid-cols-3 max-lg:gap-2">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton
                key={index}
                animationType="pulse"
                className="mx-0 h-5 w-16 rounded-md bg-gray-200 max-lg:mx-auto"
              />
            ))}
          </div>
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-3 gap-2 px-3 max-sm:px-0">
              {Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Skeleton
                    animationType="pulse"
                    className="size-5 rounded bg-gray-200"
                  />
                  <Skeleton
                    animationType="pulse"
                    className="h-4 w-16 rounded bg-gray-200 sm:w-20"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <Skeleton
                animationType="pulse"
                className="h-6 w-24 rounded bg-gray-200"
              />
              <div className="space-y-2">
                <Skeleton
                  animationType="pulse"
                  className="h-4 w-full rounded bg-gray-200"
                />
                <Skeleton
                  animationType="pulse"
                  className="h-4 w-full rounded bg-gray-200"
                />
                <Skeleton
                  animationType="pulse"
                  className="h-4 w-2/3 rounded bg-gray-200"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 hidden flex-col gap-4 lg:flex">
          <Skeleton
            animationType="pulse"
            className="h-8 w-56 rounded bg-gray-200"
          />
          <Skeleton
            animationType="pulse"
            className="h-14 w-full rounded-lg bg-gray-200"
          />
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-gray-200 bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-2px_8px_0_#838BB41F] lg:hidden">
        <div className="space-y-2">
          <Skeleton
            animationType="pulse"
            className="h-3 w-16 rounded bg-gray-200"
          />
          <Skeleton
            animationType="pulse"
            className="h-5 w-24 rounded bg-gray-200"
          />
        </div>
        <Skeleton
          animationType="pulse"
          className="h-11 w-1/2 max-w-56 rounded-lg bg-gray-200"
        />
      </div>
    </main>
  );
}
