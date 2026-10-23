import RoomDetailsImage from "../../_components/RoomDetailsImage"
import RoomDetailsInfo from "../../_components/RoomDetailsInfo"

const RoomDetailsPage = () => {
  return (

    <main className="app-container flex w-full flex-col gap-8 lg:flex-row lg:justify-between ">
      <RoomDetailsImage />
      <RoomDetailsInfo />
    </main>

  )
}

export default RoomDetailsPage