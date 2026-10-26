"use server";

import { ForgotPasswordPayload, ForgotPasswordResponse, RegisterPayload, RegisterResponse, VerifyOtpPayload, VerifyOtpResponse } from "@/types/auth.types";

// ----- Register Api -------------------------------------------------------------------------

export async function RegisterAction(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const response = await fetch(
    `${process.env.API}api/auth/register`,
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
    `${process.env.API}api/auth/verify-otp`,
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
    `${process.env.API}api/auth/forgot-password`,
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
