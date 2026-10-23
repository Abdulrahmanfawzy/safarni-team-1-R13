import ImagePlane from "@/features/flights/shared/ImagePlane";
import Merc from "@/assets/images/e744f4cf979ec01abb63356b5a84a958a241a35d.png"
const RentCar = () => {
    const Details = [
        { id: 1, name: "Power", value: "429 hp @ 6,100 rpm" },
        { id: 2, name: "Max Speed", value: "280 KM/H" },
        { id: 3, name: "Acceleration", value: "4.9 sec 0-60 mph" }
    ]
    return (
        <div className="relative flex gap-12 ">
            <ImagePlane className="rotate-y-180" image={Merc} />
            <div className="flex flex-col  gap-2 bg-green-100 p-2">
                <h1 className=" text-3xl font-medium text-gray-900">Popular Cars </h1>
                <div className="flex gap-2">
 {
                    Details.map((deta) => {
                        return <div className="flex"  key={deta.id}>
                            <div className="p-2 shadow-2xs border flex flex-col gap-2 border-gray-200 rounded-[10px]">
                                <p className="font-medium text-gray-900 text-[23px]">{deta.name}</p>
                                <p className="font-normal text-gray-500 text-[16px]">{deta.value}</p>
                            </div>
                        </div>
                    })
              }
                </div>
               

            </div>
        </div>


    )
}
export default RentCar;