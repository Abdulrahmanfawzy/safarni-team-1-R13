import Image from "next/image"
import { PopularCarData } from "../constants/DataCars"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const PopularCar = () => {
    return (
        <div className="mt-6">
            <h1 className="mb-4 text-[23px] font-medium text-gray-800">Popular Cars</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                {PopularCarData.map((item) => {
                    return (
                        <div className="w-full flex flex-col  px-4 py-2   gap-4 shadow-2xs" key={item.id}>
                            <div className="flex flex-row-reverse items-end justify-between">
                                <Image src={item.image} alt={item.name} width={233} height={187} className="rotate-y-180" />
                                <h2 className="text-[20px] font-medium pl-3 text-gray-800">{item.name}</h2>
                            </div>
                            <div className="flex gap-6 justify-between px-3 ">
                                <p className="text-[15px] font-normal text-gray-500">{item.type}</p>
                                <p className="text-[15px] font-normal text-gray-500">{item.seats}</p>
                                <p className="text-[15px] font-normal text-gray-500">{item.Turn}</p>
                            </div>
                            <div className="flex gap-10 w-full "  >
                                <Link href={"/cars/rent-now"} className="w-[45%]">
                                    <Button variant={"primary"} size={"lg"} className={"w-full"} >Rent Now </Button>

                                </Link>
                                <Link href={"/cars/:id"} className="w-[45%]">
                                    <Button variant={"default"} className={" w-full bg-transparent border border-primary text-primary hover:bg-gray-200 "} size={"lg"}>Detail </Button>
                                </Link>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default PopularCar