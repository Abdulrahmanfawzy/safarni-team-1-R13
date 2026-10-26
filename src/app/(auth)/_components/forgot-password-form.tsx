import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SignUpFormValues, signUpSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react"
import { useForm } from "react-hook-form";

interface IProps {



}

const ForgotPasswordForm=({}:IProps)=> {
    
      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        mode: "onChange",
        defaultValues: {
         
          email: "",
         
        },
      });
    
    
    
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

      
      <Button
        className="h-12 w-full mt-3"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Resetting Password ..." : "Reset Password"}
      </Button>
    </form>
  )
}

export default ForgotPasswordForm