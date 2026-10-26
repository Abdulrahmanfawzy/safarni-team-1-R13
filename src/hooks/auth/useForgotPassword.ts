"use client";

import { useMutation } from "@tanstack/react-query";
import { forgotPasswordAction } from "@/actions/auth";

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPasswordAction,
  });
}