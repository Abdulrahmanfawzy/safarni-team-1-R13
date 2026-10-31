
import { ComparePageSkeleton } from "@/components/skeletons/CompareSkeleton";
import CompareContent from "./_components/compare-content";
import { Suspense } from "react";

export default function ComparePage() {
  return (
    <Suspense fallback={<ComparePageSkeleton />}>
      <CompareContent />
    </Suspense>
  );
}

