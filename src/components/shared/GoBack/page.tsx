
'use client'

import { Button } from '@base-ui/react'

export default function GoBack() {
  return (
    <div className='py-10 my-2'>
             <Button
                type="button"
                aria-label="Go back"
                onClick={() => window.history.back()}
                className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
                  <path
                    d="m15 18-6-6 6-6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </Button>
        
    </div>
  )
}
