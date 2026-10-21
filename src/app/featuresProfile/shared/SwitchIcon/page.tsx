
'use client'

import { Switch } from '@headlessui/react';
import React, { useState } from 'react'

export default function SwitchIcon() {

  const [enabled, setEnabled] = useState(false);


  return (
    <div>
        
 <Switch
      checked={enabled}
      onChange={setEnabled}
      className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-blue-600"
    >
      <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
    </Switch>

    </div>
  )
}
