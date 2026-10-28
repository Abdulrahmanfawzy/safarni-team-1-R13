'use client'

import loginImg from "@/assets/images/login.svg"
import { AuthLayout } from "../_components/auth-layout";
import { AuthFormHeading } from "../_components/auth-form-heading";
import { SocialLoginOptions } from "../_components/social-login-options";
import { AuthAccountPrompt } from "../_components/auth-account-prompt";
import LoginForm from "../_components/login-form";

interface IProps {



}

const loginPage = ({ }: IProps) => {
 

  return (
    <AuthLayout image={loginImg} imageAlt="Safari " hasIcon={true} href="/get-started">
      <div className="flex flex-col gap-5 sm:gap-6">
        <AuthFormHeading
          title="Welcome Again"
          description="welcome back! please fill your data"
        />
        <LoginForm />
        <SocialLoginOptions />
        <AuthAccountPrompt
          message="Don't have an account?"
          linkText="Sign Up"
          href="/signup"
        />
      </div>
    </AuthLayout>

  )
}

export default loginPage