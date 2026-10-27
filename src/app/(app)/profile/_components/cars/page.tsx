


// import Image from 'next/image'
// import { getCarDetails } from '../../service/car.service'

// export default async function Cars() {

// const data = await getCarDetails(1)
// console.log(data);


//   return (
//     <div className='border-[#B22459]  border relative py-10 my-28'>



// <div className='flex justify-between  items-center mx-6'>

// <h2>  S 500 sedan </h2>

// <Image className='absolute -top-20 right-0' width={200} height={200} src="/cars.png" alt="cars" />


// </div>



// <div className='flex justify-between mx-8 text-gray-400 '>
   
//     <h5> Automatic </h5>
//     <h5> 5 seats  </h5>
//     <h5> Diesal </h5>


// </div>



//     </div>
//   )
// }
























import Image from "next/image";
import { getCarDetails } from "../../service/car.service";

export default async function Cars() {
  const data = await getCarDetails(1);
  const image = data.images[0];

  return (
    <div className="relative my-28 border border-[#B22459] py-10">
      <div className="mx-6 flex items-center justify-between">
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