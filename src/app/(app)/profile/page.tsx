import Infouser from "./_components/infouser/page";
import Info_profile from "./_components/Info_profile/page";
import { Suspense } from "react";

export default function FirstprofileImage() {
  return (
    <div>
      <div className="py-20 ml-16">
        <Suspense fallback={<p className="p-6">Loading profile...</p>}>
          <Infouser />
        </Suspense>

        <div className="h-[80%]">
          <Info_profile />
        </div>
      </div>
    </div>
  );
}
