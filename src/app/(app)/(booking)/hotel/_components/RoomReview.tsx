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
      <div className="mt-4 flex items-center justify-between gap-3">
        <h3 className="text-base font-medium text-gray-900 lg:text-xl">Review</h3>
        <Button variant="ghost" onClick={onAddReview}
          className="flex h-auto shrink-0 items-center gap-1.5 p-1 text-xs font-medium text-primary hover:bg-transparent sm:text-sm lg:p-0 lg:text-lg">
           <SquarePen />
            Add review
        </Button>
      </div>
      <Input placeholder="Search..." startIcon={<Search />} className='h-10! text-sm lg:h-14!' />

      {/* ---avaatar & name & since -------------------------------------------------------------------------- */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Image src={man} alt="" className="size-10 rounded-full object-cover sm:size-12 lg:size-15" />
          <h4 className="text-sm font-medium text-[#2C2C2C] sm:text-base lg:text-xl">Dale Thiel</h4>


        </div>
        <p className="shrink-0 text-[10px] font-medium text-gray-600 sm:text-xs lg:text-lg">11 months ago</p>
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
        <h5 className="text-sm leading-[1.5] text-[#2C2C2C] lg:text-lg">I really enjoyed my stay—the room was clean, the staff were friendly, and everything I needed was nearby.</h5>
      </div>

    </div>
  )
}

export default RoomReview