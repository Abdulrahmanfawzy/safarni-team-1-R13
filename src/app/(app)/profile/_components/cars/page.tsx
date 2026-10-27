



import Image from "next/image";
import { getCarDetails } from "../../service/car.service";

export default async function Cars() {
  const data = await getCarDetails(1);
  const image = data.images[0];

  return (
    <div className="relative mx-14 rounded-2xl my-8 border border-[#B22459] py-8">
      <div className="mx-6 my-2 flex items-center justify-between">
        <h2 className="font-semibold">
          {data.brand.name} {data.model}
        </h2>

        {image && (
          <Image
          unoptimized
            className="absolute rounded-2xl -top-16 right-5 object-contain"
            width={150}
            height={150}
            src={image}
            
            alt={`${data.brand.name} ${data.model}`}
          />
        )}
      </div>

      <div className="mx-8 flex justify-between text-gray-400">
        <h5 className="capitalize">{data.transmission}</h5>
        <h5>{data.seats_count} seats</h5>
        <h5 className="capitalize">{data.fuel_type}</h5>
      </div>
    </div>
  );
}
















