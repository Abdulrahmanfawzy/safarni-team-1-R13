"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp"]);

type AddTourPhotoButtonProps = {
  tourId: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function AddTourPhotoButton({ tourId }: AddTourPhotoButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const uploadPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const photo = event.currentTarget.files?.[0];
    if (!photo) return;

    setError("");
    setSuccess("");
    const extension = photo.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_TYPES.has(photo.type) && !ALLOWED_EXTENSIONS.has(extension)) {
      setError("Choose a JPG, JPEG, PNG, or WEBP image.");
      event.currentTarget.value = "";
      return;
    }
    if (photo.size === 0 || photo.size > MAX_PHOTO_SIZE) {
      setError("The photo must be 5 MB or smaller.");
      event.currentTarget.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("image", photo);

    setIsUploading(true);
    try {
      const response = await fetch(`/api/tours/${tourId}/photos`, {
        method: "POST",
        body: formData,
      });
      const result: unknown = await response.json().catch(() => null);

      if (!response.ok || (isRecord(result) && result.success === false)) {
        setError(
          (isRecord(result) && typeof result.message === "string" && result.message) ||
            "The photo could not be uploaded. Please try again.",
        );
        return;
      }

      setSuccess(
        (isRecord(result) && typeof result.message === "string" && result.message) ||
          "Photo added to the tour gallery.",
      );
      router.refresh();
    } catch {
      setError("Unable to upload the photo. Check your connection and try again.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        className="sr-only"
        aria-label="Choose a tour photo"
        onChange={uploadPhoto}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="gap-1.5 text-primary"
        loading={isUploading}
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
      >
        <Camera className="size-4" aria-hidden="true" />
        {isUploading ? "Uploading photo…" : "Add photo"}
      </Button>
      {error && <p role="alert" className="text-center text-sm text-red-600">{error}</p>}
      {success && <p role="status" className="text-center text-sm text-emerald-700">{success}</p>}
      <p className="text-center text-xs text-muted-foreground">JPG, JPEG, PNG, or WEBP · up to 5 MB</p>
    </div>
  );
}
