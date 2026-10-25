
import { CompareItem } from "@/types/compare.types";
import { Check, X } from "lucide-react";

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
            className={`flex min-w-0 flex-col items-start rounded-lg border bg-[#FAFAFA] p-6 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                selected
                    ? "border border-blue-700"
                    : "border-gray-300 hover:border-primary/50"
            }`}
        >
            <span className="text-xl font-medium text-gray-900">
                {item.title}
            </span>

            <span className="mt-2 text-2xl font-semibold text-[#0F1417]">
                ${item.price}
                <span className="text-lg font-medium text-gray-500">
                    {" "}/person
                </span>
            </span>

            <span className="mt-3 flex flex-col gap-2 text-left text-base text-gray-900">
                <span className="flex items-center gap-0.5">
                    <Check size={20} />
                    <span>Duration: {item.duration}</span>
                </span>
                <span className="flex items-center gap-0.5">
                    <Check size={20} />
                    <span>Highlights: {item.highlights[0]}</span>
                </span>
                <span className="flex items-center gap-0.5">
                    <Check size={20} />
                    <span>Availability: {item.availability}</span>
                </span>
                <span className="flex items-center gap-0.5">
                    <Check size={20} />
                    <span>Location: {item.location}</span>
                </span>
                <span className="flex items-center gap-0.5">
                    <Check size={20}/>
                    <span>Transportation: {item.transportation}</span>
                </span>
            </span>
        </button>
    );
}