import RentCar from "@/features/Cars/components/RentCar"
import ImagePlane from "@/features/flights/shared/ImagePlane"
import Merc from "@/assets/images/e744f4cf979ec01abb63356b5a84a958a241a35d.png"
const RentNow = () => {
    return (
        <div className="w-full">
            <main className="container mx-auto max-w-7xl flex">
                <ImagePlane className="rotate-y-180" image={Merc} />

                <RentCar />
            </main>
        </div>
    )
}
export default RentNow