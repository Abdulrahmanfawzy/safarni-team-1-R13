

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  personalInfoSchema,
  type PersonalInfoValues,
} from "@/schemas/personalInfo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
export default function PersonalInfoForm() {
  
  
  const router = useRouter()
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoValues>({
    defaultValues: {
      name: "",
      email: "",
      location: "",
      phone: "",
    },
    resolver: zodResolver(personalInfoSchema),
  });

  
  function submitForm(data: PersonalInfoValues) {
    console.log(data);
      router.push("/profile")
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="mt-6 space-y-3">
      <div className="relative">
        <label htmlFor="name">Name</label>
        <User className="absolute left-2 top-10 size-4" aria-hidden="true" />
        <Input
          {...register("name")}
          id="name"
          className="pl-8"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="relative">
        <label htmlFor="email">Email</label>
        <Mail className="absolute left-2 top-10 size-4" aria-hidden="true" />
        <Input
          {...register("email")}
          id="email"
          type="email"
          className="pl-8"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="relative">
        <label htmlFor="location">Location</label>
        <MapPin className="absolute left-2 top-10 size-4" aria-hidden="true" />
        <Input
          {...register("location")}
          id="location"
          className="pl-8"
          placeholder="Your location"
        />
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
      </div>

      <div className="relative">
        <label htmlFor="phone">Phone Number</label>
        <Phone className="absolute left-2 top-10 size-4" aria-hidden="true" />
        <Input
          {...register("phone")}
          id="phone"
          type="tel"
          className="pl-8"
          placeholder="Your phone number"
        />
        {errors.phone && (
          <p className="text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <Button className="mt-2 w-full" type="submit" variant="primary" size="lg">
        Submit
      </Button>
    </form>
  );
}