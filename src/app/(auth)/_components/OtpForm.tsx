"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { AuthAccountPrompt } from "./AuthAccountPrompt"
interface IProps {



}

const OtpForm = ({ }: IProps) => {
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

  return (
    <form className="w-full space-y-3 sm:space-y-4">
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-base text-gray-900" aria-live="polite">
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </p>
        <InputOTP maxLength={4}>
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
      <Button className="h-12 w-full mt-1.5" type="submit" >
        Verify
      </Button>
    
    </form>
  )
}

export default OtpForm