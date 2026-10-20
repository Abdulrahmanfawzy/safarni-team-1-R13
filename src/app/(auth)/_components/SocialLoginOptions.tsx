import Image from "next/image";
import appleIcon from "@/assets/images/apple.svg";
import facebookIcon from "@/assets/images/facebook.svg";
import googleIcon from "@/assets/images/googlr.svg";

const socialOptions = [
  { name: "Google", icon: googleIcon },
  { name: "Facebook", icon: facebookIcon },
  { name: "Apple", icon: appleIcon },
];

export function SocialLoginOptions() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 mx-3">
        <div className="flex-1 border-t border-gray-400" />
        <span className="text-sm text-gray-400">Or</span>
        <div className="flex-1 border-t border-gray-400" />
      </div>
      <div className="flex items-center justify-center gap-2">
        {socialOptions.map(({ name, icon }) => (
          <div
            key={name}
            className="flex h-15.5 w-40 items-center justify-center rounded-lg border border-primary px-8 py-4"
          >
            <Image src={icon} alt={name} />
          </div>
        ))}
      </div>
    </div>
  );
}
