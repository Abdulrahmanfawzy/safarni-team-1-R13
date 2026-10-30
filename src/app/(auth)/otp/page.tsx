'use client'
import { Suspense } from "react"
import loginImg from "@/assets/images/login.svg"
import { AuthLayout } from "../_components/auth-layout"
import { AuthFormHeading } from "../_components/auth-form-heading"
import { Mail } from "lucide-react"
import OtpForm from "../_components/otp-form"
import { useSearchParams } from "next/navigation"

function OtpContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') ?? '';
    return (
        <div className="flex flex-col justify-center items-center gap-5 sm:gap-6">
            <Mail className="text-gray-300 text-center " size={35} />
            <AuthFormHeading
                title="Verify Code"
                description="Please enter the code we just sent to email: "
                spanText={email}
            />
            <OtpForm email={email} />
        </div>
    )
}

const OtpPage = () => {
    return (
        <AuthLayout image={loginImg} imageAlt="Safari " hasIcon={true} href="/forgot-password">
            <Suspense fallback={<div className="flex flex-col justify-center items-center gap-5 sm:gap-6"><Mail className="text-gray-300 text-center" size={35} /></div>}>
                <OtpContent />
            </Suspense>
        </AuthLayout>
    )
}

export default OtpPage
