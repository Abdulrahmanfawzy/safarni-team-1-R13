"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormValues, signUpSchema } from "@/schemas/auth.schema";
import { PasswordRequirements } from "./password-requirements";
import { useRegister } from "@/hooks/auth/use-register";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUpForm = () => {
  const { mutate, isPending, error } = useRegister();
  const router = useRouter()
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

 const onSubmit = (data: SignUpFormValues) => {
  mutate(
    {
      name: data.name,
      email: data.email,
      password: data.password,
    },
    
    {
      onSuccess: (result) => {
        toast.success(result.message)
        router.push(
          `/otp?email=${encodeURIComponent(data.email)}`
        );
      },
       onError: (error) => {
        toast.error(error.message);
      },
    },
     
     
    
  );
};

  return (
    <form
      className="w-full space-y-3 sm:space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-1">
        <Input
          {...register("name")}
          label="Name"
          startIcon={<User />}
          placeholder="kneeDue"
          type="text"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

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
        <div className="pt-2">
          <PasswordRequirements password={password} />
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button
        className="h-12 w-full"
        type="submit"
        disabled={isSubmitting}
        loading={isPending}
      >
         Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
