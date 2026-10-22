import { BackButton } from "@/components/shared/BackButton"
import Image from "next/image"
import roomImg from "@/assets/images/room-details.svg"
import DiscountBadge from "../../_components/DiscountBadge"
import HotelRating from "../../_components/HotelRating"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface IProps {



}

const page = ({ }: IProps) => {
  return (
    // <section className="min-h-screen bg-background ">



    <div className="app-primary w-full flex justify-between gap-8 bg-blue  ">
      {/* Left: Image */}
      <section className=" hidden items-start justify-center  lg:flex lg:flex-col lg:pr-0  ">
        <div className="absolute left-25 top-28 cursor-pointer">
          <BackButton />
        </div>
        <Image
          src={roomImg}
          alt={''}
          width={508}
          height={602}
          className=" object-contain mt-19 ml-14"
          priority
        />
      </section>

      {/* Right: Content */}

      <section className="w-full flex flex-col flex-1  gap-3 justify-start mt-20 pl-8 mr-8 ">


        {/* dicount & rate--------------------------------- */}
        <div className="flex items-start justify-between">
          <DiscountBadge discount={20} />
          <div className="flex items-center justify-between">
            <HotelRating rating={4.5} />
            <span className="text-[#4B4F63] text-base font-semibold leading-[2%]">(345)reviews</span>
          </div>

        </div>

        {/* name & location */}
        <div className="space-y-2">
          <h2 className="text-xl text-gray-900 font-medium leading-4 capitalize ">HarborHaven HIdeaway</h2>
          <p className="text-base text-gray-500 leading-4 capitalize ">1012 oscean avanue, New Yourk ,USA</p>
        </div>


        {/* tabs */}
        <Tabs defaultValue="About" className="w-full">
          <TabsList variant="line">
            <TabsTrigger value="overview">About</TabsTrigger>
            <TabsTrigger value="analytics">Gallery</TabsTrigger>
            <TabsTrigger value="reports">Review</TabsTrigger>
          </TabsList>
        </Tabs>

      </section>
    </div>

    // </section>
  )
}

export default page