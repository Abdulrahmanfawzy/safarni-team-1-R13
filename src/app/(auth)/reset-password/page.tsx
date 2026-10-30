import { Suspense } from "react"
import { AuthLayout } from "../_components/auth-layout"
import { AuthFormHeading } from "../_components/auth-form-heading"
import forgotImg from "@/assets/images/forgot.svg"
import ResetPasswordForm from "../_components/ResetPasswordForm"
import { Lock } from "lucide-react"

export default function ResetPasswordPage() {
  return (
    <AuthLayout image={forgotImg} imageAlt="Safari" hasIcon={true} href="/otp">
      <div className="flex flex-col justify-center items-center gap-5 sm:gap-6">
        <Lock className="text-gray-300 text-center" size={35} />
        <AuthFormHeading
          title="Set New Password"
          description="Your New Password Must be Different to Previously Used Password"
        />
        <Suspense fallback={<div className="h-48 w-full animate-pulse rounded-xl bg-gray-100" />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </AuthLayout>
  )
}
