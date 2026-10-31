



"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
  import { IoMdArrowDropright } from "react-icons/io";

type SecurityActionCardProps = {
  title: string;
  description: string;
  variant?: "default" | "danger";
  action?: "deactivate" | "delete";
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
    if (!action || isPending) return;

    const isDelete = action === "delete";
    const confirmed = window.confirm(
      isDelete
        ? "Are you sure you want to permanently delete your account? This cannot be undone."
        : "Are you sure you want to temporarily deactivate your account?",
    );

    if (!confirmed) return;

    setIsPending(true);
    setError("");



    try {
      const response = await fetch(
        isDelete ? "/api/profile/delete-account" : "/api/profile/deactivate",
        { method: isDelete ? "DELETE" : "POST" },
      );

      const responseText = await response.text();
      const result = responseText ? JSON.parse(responseText) : {};

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message ||
            (isDelete
              ? "Could not delete the account."
              : "Could not deactivate the account."),
        );
      }

      window.alert(
        result.message ||
          (isDelete
            ? "Your account has been deleted."
            : "Your account has been deactivated."),
      );

      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsPending(false);
    }
  }

  const pendingText =
    action === "delete" ? "Deleting account..." : "Deactivating account...";

  return (
    <button
      type="button"
      disabled={!action || isPending}
      onClick={handleClick}
      className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-3 text-left shadow-sm ring-1 ring-slate-100 transition hover:shadow-md disabled:cursor-wait disabled:opacity-70"
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
          {isPending ? pendingText : description}
        </span>

        {error && (
          <span role="alert" className="mt-2 block text-xs text-red-600">
            {error}
          </span>
        )}
      </span>

  
  
 <IoMdArrowDropright />
    
    
    </button>
  );
}
