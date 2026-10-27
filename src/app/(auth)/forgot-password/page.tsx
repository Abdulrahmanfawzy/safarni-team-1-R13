'use client'
import forgotImg from "@/assets/images/forgot.svg"
import { AuthLayout } from "../_components/auth-layout"
import { AuthFormHeading } from "../_components/auth-form-heading"
import ForgotPasswordForm from "../_components/forgot-password-form"
import { KeyRound } from "lucide-react"
interface IProps {
}

const forgotPasswordPage=({}:IProps)=> {
  return (
    <AuthLayout image={forgotImg} imageAlt="Safari " hasIcon={true} href="/signup">
          <div className="flex flex-col justify-center items-center gap-5 sm:gap-6">
            <KeyRound className="text-gray-300 text-center " size={35} />
            <AuthFormHeading
              title="Forgot Password?"
              description="please enter your email to reset that password"
            />
            <ForgotPasswordForm />
            
          </div>
    </AuthLayout>
  )
}

export default forgotPasswordPage