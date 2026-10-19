import { ReactNode } from "react";
import { AuthLayout } from "./_components/auth-layout"

const layout=({children}:{children: ReactNode;})=> {
  return (
    <AuthLayout>{children}</AuthLayout>
  )
}

export default layout