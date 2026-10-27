import getStarted from "@/assets/images/get-started.svg"

import { AuthLayout } from "../_components/auth-layout"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
interface IProps {



}

const getStartedPage = ({ }: IProps) => {
  return (
    <AuthLayout
      image={getStarted}
      imageAlt="Safari travel illustration"
      className="max-h-136!"
    >
      <div className="flex flex-col justify-between gap-6 ">


        <h1 className="text-2xl font-medium text-gray-900 leading-[100%] text-center">
          Welcome!
        </h1>

        <p className="text-[21px] text-gray-600 leading-[150%] text-center">
          Safari is your all-in-one travel guide.
          Discover destinations, compare prices, and book your next adventure.
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/signup" className={buttonVariants({ className: "h-12 w-full" })}>
            Sign Up
          </Link>

          <Link href="/login" className={buttonVariants({ variant: "outline", className: "h-12 w-full" })}>
            Log In
          </Link>
        </div>
      </div>

    </AuthLayout>
  )
}

export default getStartedPage