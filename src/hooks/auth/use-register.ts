
"use client";


import { RegisterAction } from "@/actions/auth";
import { useMutation } from "@tanstack/react-query";


export function useRegister() {
  return useMutation({
    mutationFn: RegisterAction,
  });
}
