import { TopActivity } from "../types/types";
import { ActivityCard } from "./ActivityCard";
import { SectionTitle } from "./SectionTitle";

type TopActivitiesProps = {
  activities: TopActivity[];
};

export function TopActivities({ activities }: TopActivitiesProps) {
  if (activities.length === 0) return null;

  return (
    <section className="space-y-3">
      <SectionTitle>Top Activities</SectionTitle>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </section>
  );
}