"use client"

import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import {useForm} from "react-hook-form"
import { personalInfoSchema, PersonalInfoValues } from '../schema/personalInfo.schema'
import z from 'zod'
import { Button } from '@/components/ui/button'


export default function PersonalInfo() {


const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoValues>({
    defaultValues: {
      name: '',
      email: '',
      location: '',
      phone: '',
    },
    resolver: zodResolver(personalInfoSchema),
  })

  function submitForm(data: PersonalInfoValues) {
    console.log(data)
  }




  return (
    
    
    
    <div className='container mx-auto'>



<div className='py-32 mx-25  flex flex-col gap-4 '>

<div className='border rounded-full flex justify-center items-center
 bg-gray-200 w-12.5 h-12.5'>

<Link href={'/profile'}>
     
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>

</Link>

</div>






<div className='border p-6'>


   <h2 className='text-center font-semibold'> personal information   </h2>    


<form  onSubmit={handleSubmit(submitForm)} >

<div className='Name relative'>

  <label htmlFor="name">  Name </label>
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-3 absolute top-10 left-2  shrink-0"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
<Input  {...register('name')} className={'mx-3'}  id='name' placeholder='knuee Due' />
  {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

</div>



<div className='Email my-3 relative '>

  <label htmlFor="email">  Email </label>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
   strokeWidth={1.5} stroke="currentColor" className="absolute top-10 left-2 size-3">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>

<Input {...register('email')} className={'mx-3'}  id='email' placeholder='kneeDue@untitledui.com'  />

  {errors.email && <p className='text-red-500'>{errors.email.message}</p>}


</div>

<div className='location my-3 relative'>

  <label htmlFor="location">  Location </label>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
 strokeWidth={1.5} stroke="currentColor" className="size-3 absolute top-10 left-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>

<Input {...register('location')} className={'mx-3'} placeholder='200-298 Clipper St San Francisco' id='location' />

   {errors.location && <p className='text-red-500'>{errors.location.message}</p>}

</div>


<div className='phone my-3  relative'>

  <label htmlFor="phone">  Phone Number </label>

       <svg 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-3 absolute top-10 left-2  shrink-0"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
    
<Input className={'mx-3'} type='tel' {...register('phone')}  id='phone' placeholder='kneeDue@untitledui.com'  />
 {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}

</div>




<Button className={'w-full cursor-pointer mt-2'} type="submit" variant="primary" size="lg">
  Submit
</Button>

</form>










</div>





</div>









    </div>
  )
}
