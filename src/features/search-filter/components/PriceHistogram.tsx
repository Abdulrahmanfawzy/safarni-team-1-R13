
"use client";

import { useId, useMemo } from "react";
import {
  MAX_PRICE,
  MIN_PRICE,
} from "./filter-data";

type PriceHistogramProps = {
  buckets: number[];
  range: [number, number];
};

export default function PriceHistogram({
  buckets,
  range,
}: PriceHistogramProps) {
  const W = 100;
  const H = 40;
  const clipId = useId();

  const { line, area } = useMemo(() => {
    const max = Math.max(...buckets, 1);

    const points = buckets.map((value, index) => ({
      x:
        (index / Math.max(buckets.length - 1, 1)) *
        W,
      y: H - (value / max) * (H - 4),
    }));

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const previous = points[i - 1];
      const current = points[i];
      const middleX = (previous.x + current.x) / 2;
      const middleY = (previous.y + current.y) / 2;

      path += ` Q ${previous.x} ${previous.y} ${middleX} ${middleY}`;
    }

    path += ` T ${points[points.length - 1].x} ${points[points.length - 1].y}`;

    return {
      line: path,
      area: `${path} L ${W} ${H} L 0 ${H} Z`,
    };
  }, [buckets]);

  const priceRange = MAX_PRICE - MIN_PRICE;

  const x1 = ((range[0] - MIN_PRICE) / priceRange) * W;
  const x2 = ((range[1] - MIN_PRICE) / priceRange) * W;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="h-36 w-full"
      role="img"
      aria-label="Price distribution of available tours"
    >
      <defs>
        <clipPath id={clipId}>
          <rect
            x={x1}
            y={0}
            width={Math.max(x2 - x1, 0)}
            height={H}
          />
        </clipPath>
      </defs>

      <path d={area} className="fill-blue-100" />

      <path
        d={area}
        className="fill-blue-200"
        clipPath={`url(#${clipId})`}
      />

      <path
        d={line}
        fill="none"
        className="stroke-blue-200"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
