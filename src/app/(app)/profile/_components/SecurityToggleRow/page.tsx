
'use client'


import { useState } from "react";
import SwitchIcon from "../../shared/SwitchIcon/page";

type SecurityToggleRowProps = {
  label: string;
};

export default function SecurityToggleRow({
  label,
}: SecurityToggleRowProps) {
  const [enabled, setEnabled] = useState(false);

  return (
    <label className="flex cursor-pointer items-center justify-between py-3">
      <span className="font-medium text-slate-800">{label}</span>


      <SwitchIcon  />
    </label>
  );
}
