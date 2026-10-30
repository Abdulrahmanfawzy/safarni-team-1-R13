

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PersonalInfoForm from "../_components/personalInfoform/page";

export default function PersonalInfoPage() {
  return (
    <main className="container mx-auto">
      <div className="mx-25 flex flex-col gap-4 py-32">
        <Link
          href="/profile"
          aria-label="Back to profile"
          className="flex size-12.5 items-center justify-center rounded-full border bg-gray-200"
        >
          <ArrowLeft className="size-6" />
        </Link>

        <section className="border p-6">
          <h1 className="text-center font-semibold">Personal Information</h1>
          <PersonalInfoForm />
        </section>
      </div>
    </main>
  );
}