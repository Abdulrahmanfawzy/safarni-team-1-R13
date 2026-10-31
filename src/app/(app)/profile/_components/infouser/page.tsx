import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getAvatar } from "../../service/infouser.service";
import type { Iavatar } from "../../types/infouser.types";


export default async function Infouser() {
  const session = await getServerSession(authOptions);
  let data: Iavatar = {
    id: Number(session?.user?.id) || 0,
    name: session?.user?.name || "Traveler",
    email: session?.user?.email || "",
    phone: "",
    location: "",
    avatar_url: "",
    role: session?.user?.role || "",
    status: "",
    is_verified: false,
    created_at: "",
  };
  let profileError = false;

  try {
    data = await getAvatar();
  } catch (error) {
    profileError = true;
    console.error("Unable to load profile details:", error);
  }


  return (
    <section className="rounded-xl border border-[#3F52B4] p-4 sm:p-6">
      {profileError && (
        <div role="alert" className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          We couldn’t load your latest profile details. Please sign in again to refresh your session.{" "}
          <Link href="/login" className="font-semibold underline underline-offset-2">
            Sign in
          </Link>
        </div>
      )}
      <div className="flex min-w-0 items-center gap-4">
        {data.avatar_url ? (
          <Image
            src={data.avatar_url}
            width={80}
            height={80}
            alt={`${data.name}'s profile photo`}
            className="size-16 shrink-0 rounded-full object-cover sm:size-20"
          />
        ) : (
          <div aria-hidden="true" className="flex size-16 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl font-semibold text-[#1E429F] sm:size-20">
            {data.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold sm:text-xl">
            {data.name}
          </h2>
          <span className="block truncate text-sm mt-2 text-gray-500 sm:text-base">
            {data.email}
          </span>
 
 
 
 
        </div>
      </div>
    </section>
  );
}
