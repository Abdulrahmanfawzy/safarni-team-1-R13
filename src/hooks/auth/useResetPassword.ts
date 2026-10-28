
"use client";

import { useMutation } from "@tanstack/react-query";
import { resetPasswordAction } from "@/actions/auth";

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPasswordAction,
  });
}
