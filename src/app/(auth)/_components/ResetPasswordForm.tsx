"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordRequirements } from "./password-requirements";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPassword } from "@/hooks/auth/useResetPassword";
import { toast } from "sonner";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const password = watch("password")??"";
// ----------------------------------------------------------------
const router = useRouter();
const searchParams = useSearchParams();

const email = searchParams.get("email") ?? "";
const code = searchParams.get("code") ?? "";

const { mutateAsync, isPending } = useResetPassword();
const onSubmit = async (data: ResetPasswordFormValues) => {
  if (!email || !code) {
    toast.error("Email or verification code is missing");
    return;
  }

  try {
    const result = await mutateAsync({
      email,
      code,
      password: data.password,
      password_confirmation: data.confirmPassword,
    });

    toast.success(result.message);
    router.push("/login");
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to reset password",
    );
  }
};
  return (
    <form
      className="w-full space-y-3 sm:space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-1">
        <Input
          {...register("password")}
          label="Password"
          startIcon={<Lock />}
          endIcon={
            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          }
          placeholder="********"
          type={showPassword ? "text" : "password"}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
       
      </div>

      <div className="space-y-1">
        <Input
          {...register("confirmPassword")}
          label="Confirm Password"
          startIcon={<Lock />}
          endIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword((previous) => !previous)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              aria-pressed={showConfirmPassword}
              className="flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? <Eye /> : <EyeOff />}
            </button>
          }
          placeholder="********"
          type={showConfirmPassword ? "text" : "password"}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}

         <div className="pt-2">
          <PasswordRequirements password={password} />
        </div>
      </div>

      <Button
        className="h-12 w-full"
        type="submit"
        loading={isPending}
      >
       Reset Password
      </Button>
      <Link
        href="/login"
        className="flex items-center justify-center gap-1 text-center text-sm text-gray-900 underline-offset-4 hover:underline"
      >
        <ArrowLeft size={15} className='text-gray-400' /><span>Back to login</span>
        
      </Link>
    </form>
  );
};

export default ResetPasswordForm;
