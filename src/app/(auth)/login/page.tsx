'use client'

import loginImg from "@/assets/images/login.svg"
import { useState } from "react";
import { AuthLayout } from "../_components/auth-layout";
import { AuthFormHeading } from "../_components/AuthFormHeading";
import { SocialLoginOptions } from "../_components/SocialLoginOptions";
import { AuthAccountPrompt } from "../_components/AuthAccountPrompt";
import LoginForm from "../_components/LoginForm";

interface IProps {



}

const loginPage = ({ }: IProps) => {
 

  return (
    <AuthLayout image={loginImg} imageAlt="Safari " hasIcon={true} href="/get-start">
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