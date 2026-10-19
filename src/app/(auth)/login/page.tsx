'use client'
import { Input } from "@/components/ui/input"
import { Eye, LockKeyhole, Mail, Plus, Search } from "lucide-react"
import { useState } from "react";

interface IProps {



}

const loginPage=({}:IProps)=> {
    const [showPassword, setShowPassword] = useState(false);

  return (
     <div className="flex gap-3">
     
    

      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        startIcon={<LockKeyhole />}
        required
        endIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Eye />
          </button>
        }
      />

      
    </div>
   
  )
}

export default loginPage