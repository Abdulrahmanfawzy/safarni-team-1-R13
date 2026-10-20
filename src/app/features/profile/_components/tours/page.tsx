

import Image from "next/image";
import { IoStarSharp } from "react-icons/io5";

export default function Tours() {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-[#B22459] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <Image
          src="/pyramids.png"
          alt="pyramids"
          width={120}
          height={120}
          className="size-20 rounded-lg object-cover sm:size-28"
        />

        <div className="min-w-0 space-y-2">
          <p className="text-sm text-slate-500">Full Day Tours</p>
          <h2 className="text-lg font-semibold text-slate-900">Luxor</h2>
          <p className="text-sm text-slate-600">
            From <span className="font-semibold text-blue-600">$150</span> per
            person
          </p>
        </div>
      </div>

      <div
        className="flex  items-center gap-1 rounded-full
         bg-amber-50 px-3  text-sm sm:self-center"
     
      >
        <IoStarSharp className="text-amber-400"  />
        <span className="font-medium text-slate-800">4.3</span>
      </div>
    </article>
  );
}