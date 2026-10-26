'use client'
import loginImg from "@/assets/images/login.svg"
import { AuthLayout } from "../_components/auth-layout"
import { AuthFormHeading } from "../_components/auth-form-heading"
import { Mail } from "lucide-react"
import OtpForm from "../_components/otp-form"
interface IProps {
}

const OtpPage = ({ }: IProps) => {
    return (
        <AuthLayout image={loginImg} imageAlt="Safari " hasIcon={true} href="/forgot-password">
            <div className="flex flex-col justify-center items-center gap-5 sm:gap-6">
                <Mail className="text-gray-300 text-center " size={35} />
                <AuthFormHeading
                    title="Verify Code"
                    description="Please enter the code we just sent to email: "
                    spanText="kneedue@untitledui.com"
                />
                
                <OtpForm />

            </div>
        </AuthLayout>
    )
}

export default OtpPage