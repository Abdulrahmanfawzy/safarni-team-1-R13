import { AuthLayout } from "../_components/auth-layout"
import { AuthFormHeading } from "../_components/AuthFormHeading"
import forgotImg from "@/assets/images/forgot.svg"
import ResetPasswordForm from "../_components/ResetPasswordForm"
import { Lock } from "lucide-react"
interface IProps {



}

const ResetPasswordPage=({}:IProps)=> {
  return (
     <AuthLayout image={forgotImg} imageAlt="Safari" hasIcon={true} href="/otp">
       
      <div className="flex flex-col justify-center items-center gap-5 sm:gap-6">
         <Lock className="text-gray-300 text-center " size={35}/>
        <AuthFormHeading
          title="Set New Password"
          description="Your New Password Must be Different to Previously Used Password"
        />
        <ResetPasswordForm />
        
      </div>
    </AuthLayout>
  )
}

export default ResetPasswordPage