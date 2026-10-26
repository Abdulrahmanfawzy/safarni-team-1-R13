"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { AuthAccountPrompt } from "./auth-account-prompt"
import { useVerifyOtp } from "@/hooks/auth/use-verify-otp"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
interface IProps {
email:string;


}

const OtpForm = ({ email}: IProps) => {
  //---counter->>-----------------------------------------------
  const [timeRemaining, setTimeRemaining] = useState(30)
  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeRemaining((remaining) => {
        if (remaining <= 1) {
          window.clearInterval(interval)
          return 0
        }

        return remaining - 1
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [])

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
// -------------------------------------------------------------
const [otp, setOtp] = useState("");
const router = useRouter();
 const {mutate,isPending,isError} = useVerifyOtp();
 const handleVerify = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (otp.length !== 4) {
    toast.error("Please enter the 4-digit verification code");
    return;
  }

  mutate(
    { email,code: otp },
    {
      onSuccess: (result) => {
        toast.success(result.message);
        router.push("/login");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );
};
  return (
    <form className="w-full space-y-3 sm:space-y-4" onSubmit={handleVerify}>
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-base text-gray-900" aria-live="polite">
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </p>
        <InputOTP maxLength={4} value={otp} onChange={setOtp} disabled={isPending}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <AuthAccountPrompt
          message="OTP not Recieve?"
          linkText="send again"
          href=""
        />
      </div>
      <Button className="h-12 w-full mt-1.5" type="submit" loading={isPending} >
        Verify
      </Button>
    
    </form>
  )
}

export default OtpForm