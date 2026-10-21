


import Image from 'next/image'

export default function Cars() {
  return (
    <div className='border-[#B22459] border relative py-10 my-28'>



<div className='flex justify-between  items-center mx-6'>

<h2>  S 500 sedan </h2>

<Image className='absolute -top-20 right-0' width={200} height={200} src="/cars.png" alt="cars" />


</div>



<div className='flex justify-between mx-8 text-gray-400 '>
   
    <h5> Automatic </h5>
    <h5> 5 seats  </h5>
    <h5> Diesal </h5>


</div>



    </div>
  )
}
