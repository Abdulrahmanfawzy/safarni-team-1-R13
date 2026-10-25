
import type { CompareItem } from "@/types/compare.types";
import { Check } from "lucide-react";

interface Props {
    item: CompareItem;
    selected: boolean;
    onSelect: (itemId: string) => void;
}

export default function ComparisonCard({ item, selected, onSelect }: Props) {
    return (
        <button
            type="button"
            onClick={() => onSelect(item.id)}
            aria-pressed={selected}
            aria-label={`Select ${item.title}`}
            className={`flex min-h-full min-w-0 flex-col items-start rounded-xl border bg-[#FAFAFA] p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-5 lg:p-6 ${
                selected
                    ? "border-blue-700"
                    : "border-gray-300 hover:border-primary/50"
            }`}
        >
            <span className="wrap-break-word text-base font-medium text-gray-900 sm:text-lg lg:text-xl">
                {item.title}
            </span>

            <span className="mt-2 text-xl font-semibold text-[#0F1417] sm:text-2xl">
                ${item.price}
                <span className="text-sm font-medium text-gray-500 sm:text-base lg:text-lg">
                    {" "}/person
                </span>
            </span>

            <span className="mt-3 flex w-full flex-col gap-2.5 text-left text-sm text-gray-900 sm:text-base">
                <span className="flex items-center gap-0.5">
                    <Check size={18} className="shrink-0 sm:size-5" />
                    <span className="min-w-0 wrap-break-word">
                        Duration: {item.duration}
                    </span>
                </span>
                <span className="flex items-center gap-0.5">
                    <Check size={18} className="shrink-0 sm:size-5" />
                    <span className="min-w-0 wrap-break-word">
                        Highlights: {item.highlights[0]}
                    </span>
                </span>
                <span className="flex items-center gap-0.5">
                    <Check size={18} className="shrink-0 sm:size-5" />
                    <span className="min-w-0 wrap-break-word">
                        Availability: {item.availability}
                    </span>
                </span>
                <span className="flex items-center gap-0.5">
                    <Check size={18} className="shrink-0 sm:size-5" />
                    <span className="min-w-0 wrap-break-word">
                        Location: {item.location}
                    </span>
                </span>
                <span className="flex items-center gap-0.5">
                    <Check size={18} className="shrink-0 sm:size-5" />
                    <span className="min-w-0 wrap-break-word">
                        Transportation: {item.transportation}
                    </span>
                </span>
            </span>
        </button>
    );
}