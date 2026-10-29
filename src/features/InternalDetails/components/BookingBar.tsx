import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPrice } from "./Format";


type BookingBarProps = {
  slug: string;
  price: string;
};

export function BookingBar({ slug, price }: BookingBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Total price :{" "}
          <span className="text-base font-bold text-foreground">
            {formatPrice(price)}
          </span>
          <span className="text-xs">/person</span>
        </p>

        <Button  size="lg" className="min-w-40 sm:min-w-64">
          <Link href={`/tours/${slug}/book`}>Book Now</Link>
        </Button>
      </div>
    </div>
  );
}