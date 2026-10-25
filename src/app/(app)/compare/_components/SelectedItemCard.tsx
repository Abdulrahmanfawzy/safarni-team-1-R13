import Image from "next/image";
import { X } from "lucide-react";
import { CompareItem } from "@/types/compare.types";
import selectImg from "@/assets/images/place.jpg"

interface Props {
  item: CompareItem;
}

export default function SelectedItemCard({ item }: Props) {
  return (
    <article className="flex min-w-0 items-center gap-4 rounded-[24px] border border-gray-100 bg-white p-4 shadow-[0px_0px_25px_0px_#D1D5DB8F]">
      <div className="relative  w-40 h-40 shrink-0 overflow-hidden rounded-md ">
        <Image
          src={selectImg}
          alt={item.title}
          fill
          sizes="170px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1 gap-1.5">
        <h3 className="text-xl font-medium text-[#0F1417]">
          {item.title}
        </h3>
      
        <p className=" text-lg text-gray-500">{item.time} |
          <span  > ${item.price}</span>
         
        </p>
        <p className=" text-lg text-gray-500">
          {item.description}
        </p>
      </div>

      <button
        type="button"
        aria-label={`Remove ${item.title}`}
        className="self-start rounded-full p-1 text-gray-400 hover:bg-gray-100"
      >
        <X size={14} />
      </button>
    </article>
  );
}