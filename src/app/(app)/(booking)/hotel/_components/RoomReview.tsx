import { Input } from "@/components/ui/input"
import { Search, SquarePen, Star } from "lucide-react"
import man from '@/assets/images/man.jpg'
import Image from "next/image"
import { Button } from "@/components/ui/button";
interface IProps {
onAddReview: () => void;


}
const rating = 4.5;
const RoomReview = ({onAddReview }: IProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mt-4">
        <h3 className="text-gray-900 text-xl font-medium">Review</h3>
        <Button variant="ghost" onClick={onAddReview}
          className="flex items-center gap-1.5 p-0 text-lg font-medium text-primary hover:bg-transparent">
           <SquarePen />
            Add review
        </Button>
      </div>
      <Input placeholder="Search..." startIcon={<Search />} className='h-14!' />

      {/* ---avaatar & name & since -------------------------------------------------------------------------- */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1.5">
          <Image src={man} alt="" className="rounded-full w-15 h-15 " />
          <h4 className="text-xl font-medium text-[#2C2C2C]">Dale Thiel</h4>


        </div>
        <p className="text-lg font-medium text-gray-600">11 months ago</p>
      </div>

      {/* stars & review  */}
      <div className="flex flex-col gap-2">
        
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={18}
              className={
                i < rating
                  ? "fill-[#FCBA42] text-[#FCBA42]"
                  : "text-gray-300"
              }
            />
          ))}

        </div>
        <h5 className="text-[#2C2C2C] text-lg leading-[136%] ">I really enjoyed my stay—the room was clean, the staff were friendly, and everything I needed was nearby.</h5>
      </div>

    </div>
  )
}

export default RoomReview