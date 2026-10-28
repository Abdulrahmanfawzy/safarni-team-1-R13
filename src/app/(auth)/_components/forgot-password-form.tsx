import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { ForgotPasswordFormValues, forgotPasswordSchema, SignUpFormValues, signUpSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IProps {



}

const ForgotPasswordForm=({}:IProps)=> {
  const router = useRouter();
    const { mutateAsync, isPending } = useForgotPassword();
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onChange",
        defaultValues: {
         
          email: "",
         
        },
      });
    
  

const onSubmit = async (data: { email: string }) => {
  try {
    const result = await mutateAsync({
      email: data.email,
    });

    toast.success(result.data);
    
    router.push(
      `/otp?email=${encodeURIComponent(data.email)}&type=reset-password`
    );
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong",
    );
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

      
      <Button
        className="h-12 w-full mt-3"
        type="submit"
        loading={isPending}
      >
         Forgot Password
      </Button>
    </form>
  )
}

export default ForgotPasswordForm