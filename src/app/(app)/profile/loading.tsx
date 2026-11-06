

import { Skeleton } from "@/components/ui/skeleton";



import React from 'react'

export default function loading() {
  return (
    <div>
        
  <div className="space-y-3">
    <Skeleton className="h-6 w-48" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </div>

  <div>



  </div>

    </div>
  )
}


