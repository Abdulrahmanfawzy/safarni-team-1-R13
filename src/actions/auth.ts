"use server";

import { RegisterResponse } from "@/types/auth.types";

// ----- Register Api -------------------------------------------------------------------------
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  
}



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