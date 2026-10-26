import { PaymentMethodForm } from "@/components/shared/Payment/PaymentShared"
import Navbar from "@/components/ui/Navbar"
import ImagePlane from "@/features/flights/shared/ImagePlane"
import creditcard from "@/assets/images/creditcard.png"
import { Suspense } from "react"

const Payment = () => {
  return (
    <div className="w-full flex flex-col min-h-screen"> 
      {/* <Navbar /> */}
      <main className="flex flex-col w-full max-w-7xl mx-auto items-center justify-evenly p-4 md:flex-row gap-8">
        <ImagePlane image={creditcard} />
        <Suspense
          fallback={
            <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-sm p-12 text-center text-sm text-neutral-500">
              Loading payment form...
            </div>
          }
        >
          <PaymentMethodForm />
        </Suspense>
      </main>
    </div>
  )
}
export default Payment
