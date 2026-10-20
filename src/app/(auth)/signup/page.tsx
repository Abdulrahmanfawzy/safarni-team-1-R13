import { AuthLayout } from "../_components/auth-layout"
import signupImg from "@/assets/images/sign-up.svg"
import SignUpForm from "../_components/SignUpForm"
import { AuthAccountPrompt } from "../_components/AuthAccountPrompt"
import { AuthFormHeading } from "../_components/AuthFormHeading"
import { SocialLoginOptions } from "../_components/SocialLoginOptions"

const signUpPage = () => {
  return (
    <AuthLayout image={signupImg} imageAlt="Safari travel illustration" hasIcon={true} href="/get-started">
      <div className="flex flex-col justify-between gap-6 mt-3">
        <AuthFormHeading
          title="Start Your Journey"
          description="Create your account to explore the world"
        />
        <SignUpForm />
        <SocialLoginOptions />
        <AuthAccountPrompt
          message="Already have an account?"
          linkText="Sign in"
          href="/login"
        />
      </div>
    </AuthLayout>
  );
}

export default signUpPage