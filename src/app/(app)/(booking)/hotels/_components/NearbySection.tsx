import HotelCard from "./HotelCard"
import ImgOne from '@/assets/images/hotel1.svg'
import ImgTwo from '@/assets/images/hotel2.svg'
import ImgThree from '@/assets/images/hotel3.svg'
import ImgFour from '@/assets/images/hotel4.svg'
import { HotelDummy } from "@/types/hotel.types"
interface IProps {



}
const dummyData: HotelDummy[] = [
  {
    id: "1",
    name: "Oasis Overture",
    image: ImgOne,
    rating: 4.2,
    discount: 10,
    location: "New York, USA",
  },
  {
    id: "2",
    name: "Hidden Haven",
    image: ImgTwo,
    rating: 4.1,
    discount: 20,
    location: "New York, USA",
  },
  {
    id: "3",
    name: "Silent Nest",
    image: ImgThree,
    rating: 4.8,
    discount: 5,
    location: "New York, USA",
  },
  {
    id: "4",
    name: "Secret Escape",
    image: ImgFour,
    rating: 4.6,
    discount: 7,
    location: "New York, USA",
  },
];
const NearbySection = ({ }: IProps) => {
    return (
       <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 mx-5">
      {dummyData.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} variant="horizontal" />
      ))}
    </section>
    )
}

export default NearbySection