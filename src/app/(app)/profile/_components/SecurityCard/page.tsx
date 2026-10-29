
"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";


type SecurityActionCardProps = {
  title: string;
  description: string;
  variant?: "default" | "danger";
  action?: "deactivate";
};



export default function SecurityActionCard({
  title,
  description,
  variant = "default",
  action,
}: SecurityActionCardProps) {
  const isDanger = variant === "danger";
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    if (action !== "deactivate" || isPending) return;

    if (!window.confirm("Are you sure you want to temporarily deactivate your account?")) {
      return;
    }

    setIsPending(true);
    setError("");

    try {
      const response = await fetch("/api/profile/deactivate", {
        method: "POST",
      });
      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Could not deactivate the account.");
      }

      window.alert(result.message || "Your account has been deactivated.");
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not deactivate the account.",
      );
    } finally {
      setIsPending(false);
    }
  }

 

  return (


    <button
      type="button"
       disabled={isPending}
        onClick={handleClick}
      className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-3 text-left shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
    >
      <span>
        <span
          className={`block font-medium ${
            isDanger ? "text-red-500" : "text-slate-800"
          }`}
        >
          {title}
        </span>

      
<span className="mt-1 block text-xs text-slate-500">
  {isPending ? "Deactivating account..." : description}
</span>

{error && (
  <span role="alert" className="mt-2 block text-xs text-red-600">
    {error}
  </span>
)}


      </span>

      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="ml-4 size-4 shrink-0 text-slate-500"
      >
        <path
          d="m9 18 6-6-6-6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
  
    </button>
  );
}







