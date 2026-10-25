
import { CompareItem } from "@/types/compare.types";
import { Check, X } from "lucide-react";

interface Props {
    item: CompareItem;
}

export default function ComparisonCard({ item }: Props) {
    return (
        <article className="flex min-w-0 flex-col items-start rounded-lg border border-gray-300 bg-[#FAFAFA] p-6">

            <h3 className="text-xl font-medium text-gray-900">
                {item.title}
            </h3>

            <p className="mt-2 text-2xl font-semibold text-[#0F1417]">
                ${item.price}
                <span className="text-lg font-medium text-gray-500">
                    {" "}/person
                </span>
            </p>

            <div className="mt-3 space-y-2 text-base text-gray-900">
                <div className="flex items-center gap-0.5">
                    <Check size={20} />
                    <p>Duration: {item.duration}</p>
                </div>
                <div className="flex items-center gap-0.5">
                    <Check size={20}/>
                    <p>Highlights: {item.highlights[0]}</p>
                </div>
                <div className="flex items-center gap-0.5">
                    <Check size={20}/>
                    <p>Availability: {item.availability}</p>
                </div>
                <div className="flex items-center gap-0.5">
                    <Check size={20}/>
                    <p>Location: {item.location}</p>
                </div>
                <div className="flex items-center gap-0.5">
                    <Check size={20}/>
                    <p>Transportation: {item.transportation}</p>
                </div>

            </div>
        </article>
    );
}