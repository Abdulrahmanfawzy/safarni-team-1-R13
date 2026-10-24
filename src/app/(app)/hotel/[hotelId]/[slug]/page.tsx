import RoomDetailsImage from "../../_components/RoomDetailsImage"
import RoomDetailsInfo from "../../_components/RoomDetailsInfo"
import roomImg from "@/assets/images/room-details.svg";
import smallImg from "@/assets/images/small-img.svg"

const images = [
  roomImg,
  smallImg,
  roomImg,
  smallImg,
  roomImg,
  smallImg,
  
];

const RoomDetailsPage = () => {
  return (

    <main className="app-container my-3.5 flex w-full flex-col gap-8 lg:flex-row lg:justify-between ">
      <RoomDetailsImage images={images} />
      <RoomDetailsInfo />
    </main>

  )
}

export default RoomDetailsPage