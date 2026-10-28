"use server";

import { ForgotPasswordPayload, ForgotPasswordResponse, RegisterPayload, RegisterResponse, ResetPasswordPayload, ResetPasswordResponse, VerifyOtpPayload, VerifyOtpResponse } from "@/types/auth.types";
import { getApiBaseUrl } from "@/lib/api-url";

// ----- Register Api -------------------------------------------------------------------------

export async function RegisterAction(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const result: RegisterResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Registration failed");
  }

  return result;
}
// ----- Otp Api -------------------------------------------------------------------------
export async function verifyOtpAction(
  payload: VerifyOtpPayload
): Promise<VerifyOtpResponse> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/auth/verify-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const result: VerifyOtpResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "OTP verification failed");
  }

  return result;
}
// -----forgot pass  -------------------------------------------------------------------------

export async function forgotPasswordAction(
  payload: ForgotPasswordPayload,
): Promise<ForgotPasswordResponse> {
  
  const response = await fetch(
    `${getApiBaseUrl()}/api/auth/forgot-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );

  const result: ForgotPasswordResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to send password reset OTP",
    );
  }

  return result;
}
// -----reset pass  -------------------------------------------------------------------------
export async function resetPasswordAction(
  payload: ResetPasswordPayload,
): Promise<ResetPasswordResponse> {


  const response = await fetch(
    `${getApiBaseUrl()}/api/auth/reset-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );

  const result: ResetPasswordResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to reset password",
    );
  }

  return result;
}
