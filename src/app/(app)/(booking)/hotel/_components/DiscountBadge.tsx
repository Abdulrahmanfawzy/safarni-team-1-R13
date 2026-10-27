interface DiscountBadgeProps {
  discount: number;
}

export default function DiscountBadge({
  discount,
}: DiscountBadgeProps) {
  return (
    <span className="rounded-20 bg-blue-50 px-6 py-2 text-sm font-medium text-primary ">
      {discount}%Off
    </span>
  );
}