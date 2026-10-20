import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SignUpFormValues, signUpSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {



}

const LoginForm=({}:IProps)=> {
     const [showPassword, setShowPassword] = useState(false);
      const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
      } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        mode: "onChange",
        defaultValues: {
          name: "",
          email: "",
          password: "",
        },
      });
    
      const password = watch("password");
    
      const onSubmit = async (data: SignUpFormValues) => {
        console.log("Valid form data:", data);
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
          <p className="text-sm text-red-500">{errors.email.message}</p>
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
        <Link href='/forget-passowrd'  className="pt-1.5 flex items-center justify-end text-lg text-gray-800 font-medium ">
          Forgot Password?
        </Link>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        className="h-12 w-full mt-3"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "login ..." : "Login"}
      </Button>
    </form>
  )
}

export default LoginForm