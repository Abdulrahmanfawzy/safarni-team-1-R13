import { Star } from "lucide-react";

interface HotelRatingProps {
  rating: number;
}

export default function HotelRating({
  rating,
}: HotelRatingProps) {
  return (
    <div className="flex items-center justify-center gap-1 text-sm">
      <Star
        size={18}
        className="fill-[#FCBA42] text-[#FCBA42] w-[23.73px] h-[23.73px]"
      />
      <span className="text-[#4B4F63] text-base font-semibold leading-[2%]">{rating}</span>
    </div>
  );
}