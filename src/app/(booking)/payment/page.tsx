import { PaymentMethodForm } from "@/components/shared/Payment/PaymentShared"
import Navbar from "@/components/ui/Navbar"
import ImagePlane from "@/features/flights/shared/ImagePlane"
import creditcard from "@/assets/images/creditcard.png"

const Payment=()=>{
    return (
        <div className="w-full flex flex-col min-h-screen"> 
      <Navbar />
      <main className="flex flex-col w-full max-w-7xl mx-auto items-center justify-evenly p-4 md:flex-row">
        <ImagePlane image={creditcard} />
        <PaymentMethodForm />
      </main>
    </div>
    )
}
export default Payment