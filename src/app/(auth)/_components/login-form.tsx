'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoginFormValues, loginSchema, SignUpFormValues, signUpSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

interface IProps {



}

const LoginForm = ({ }: IProps) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    
  });

 

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoggingIn(true)
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,

      });
       console.log("NextAuth login result:", result);
      

      if (!result || result.error) {
          toast.error(`Login failed: ${result?.error ?? "Unknown error"}`);
        return;

      }
      toast.success("Login successful");
      router.push("/");
      router.refresh();
    } catch(error) {
       console.error("Login exception:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoggingIn(false)
    }
  };

  return (
    <form
      className="w-full space-y-3 sm:space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >


      <div className="space-y-1">
        <Input
          {...register("email")}
          label="Email"
          startIcon={<Mail />}
          placeholder="kneeDue@example.com"
          type="email"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Input
          {...register("password")}
          label="Password"
          startIcon={<Lock />}
          endIcon={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          }
          placeholder="********"
          type={showPassword ? "text" : "password"}
        />
        <Link href='/forgot-password' className="pt-1.5 flex items-center justify-end text-lg text-gray-800 font-medium ">
          Forgot Password?
        </Link>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button
        className="h-12 w-full mt-3"
        type="submit"
       
        loading={isLoggingIn}
      >
         Login
      </Button>
    </form>
  )
}

export default LoginForm