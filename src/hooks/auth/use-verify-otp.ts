import { verifyOtpAction } from "@/actions/auth"
import { useMutation } from "@tanstack/react-query"

export function  useVerifyOtp(){
    return useMutation({
        mutationFn: verifyOtpAction,
    })
}