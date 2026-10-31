



import Image from "next/image";
import { getCarDetails } from "../../service/car.service";

export default async function Cars() {
  const data = await getCarDetails(1);
  const image = data.images[0];

  return (
    <div className="relative mx-4 my-8 rounded-2xl border border-[#B22459] px-4 py-6 sm:mx-8 sm:px-6 sm:py-8 md:mx-14 md:my-12">
      <div className="my-2 flex min-h-20 items-center justify-between gap-3 pr-24 sm:pr-36">
        <h2 className="break-words text-sm font-semibold sm:text-base">
          {data.brand.name} {data.model}
        </h2>

        {image && (
          <Image
          unoptimized
            className="absolute -top-3 right-2 h-20 w-24 rounded-2xl object-contain sm:-top-9 sm:right-5 sm:h-[150px] sm:w-[150px]"
            width={150}
            height={150}
            src={image}
            
            alt={`${data.brand.name} ${data.model}`}
          />
        )}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-gray-400 sm:mx-2 sm:text-sm md:mx-8">
        <h5 className="break-words capitalize">{data.transmission}</h5>
        <h5>{data.seats_count} seats</h5>
        <h5 className="break-words capitalize">{data.fuel_type}</h5>
      </div>
    </div>
  );
}
















