import Link from "next/link";

import { ReactNode } from "react";

type CardProfileProps = {
  icon: ReactNode;
  title: string;
  href:string;
};




export default function CardProfile({ icon, title , href }: CardProfileProps) {
 
  
 
    return (
    
    
<div className="flex justify-between items-center  p-2  ">


    <button
      type="button"
      className="flex  items-center gap-3 py-3 text-left  sm:px-5 sm:py-4"
    >
   {icon}

      <span className="flex-1 text-sm text-gray-800 sm:text-base">{title}</span>

    
   
    </button>
    

<Link href={href}>
      <svg
      
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
            className="size-4 cursor-pointer shrink-0 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>

</Link>

       
</div>


  );
}