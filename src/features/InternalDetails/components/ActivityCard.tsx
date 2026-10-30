import Image from "next/image";
import { MapPin } from "lucide-react";
import { TopActivity } from "../types/types";

type ActivityCardProps = {
  activity: TopActivity;
};

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <article className="space-y-2">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-muted">
        {activity.image ? (
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            sizes="(min-width: 1024px) 230px, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/50">
            <MapPin className="size-8" />
          </div>
        )}
      </div>

      <div className="space-y-0.5">
        <h3 className="text-xs font-semibold text-foreground">
          {activity.title}
        </h3>
        {activity.description && (
          <p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">
            {activity.description}
          </p>
        )}
      </div>
    </article>
  );
}