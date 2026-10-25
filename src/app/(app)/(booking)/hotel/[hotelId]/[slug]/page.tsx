import RoomDetailsImage from "../../_components/RoomDetailsImage"
import RoomDetailsInfo from "../../_components/RoomDetailsInfo"
import roomImg from "@/assets/images/room-details.svg";
import smallImg from "@/assets/images/small-img.svg"
import roomPhoto from "@/assets/images/room.jpg";
import hotelPhoto from "@/assets/images/hotel.jpg";

const images = [
  roomImg,
  smallImg,
  roomImg,
  smallImg,
  roomImg,
  smallImg,
];

const mobileImages = [
  roomPhoto,
  roomImg,
  smallImg,
  hotelPhoto,
  roomPhoto,
];

const RoomDetailsPage = () => {
  return (

    <main className="app-container my-3.5 flex w-full flex-col gap-8 max-lg:!my-0 max-lg:!px-0 lg:items-start lg:flex-row lg:justify-between ">
      <RoomDetailsImage images={images} mobileImages={mobileImages} />
      <RoomDetailsInfo />
    </main>

  )
}

export default RoomDetailsPage