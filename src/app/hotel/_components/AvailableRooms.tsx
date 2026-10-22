import { RoomDummy } from "@/types/room.types";
import roomImg from "@/assets/images/room.jpg"
import RoomCard from "./RoomCard";
interface IProps {



}
const dummyData: RoomDummy[] = [
    {
        id: "1",
        name: "Oasis Overture",
        image: roomImg,
        price: 200,

    },
    {
        id: "2",
        name: "Oasis Overture",
        image: roomImg,
        price: 200,

    },
    {
        id: "3",
        name: "Oasis Overture",
        image: roomImg,
        price: 200,

    },
    {
        id: "4",
        name: "Oasis Overture",
        image: roomImg,
        price: 200,

    },
    {
        id: "5",
        name: "Oasis Overture",
        image: roomImg,
        price: 200,

    },
    {
        id: "6",
        name: "Oasis Overture",
        image: roomImg,
        price: 200,

    },
    {
        id: "7",
        name: "Oasis Overture",
        image: roomImg,
        price: 200,

    },
    {
        id: "8",
        name: "Oasis Overture",
        image: roomImg,
        price: 200,

    },
 

];
const AvailableRooms = ({ }: IProps) => {
    return (
        <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mx-2">

            {dummyData.map((room) => (
                <div
                    key={room.id}
                    className="w-full min-w-0"
                >
                    <RoomCard room={room} />
                </div>
            ))}

        </section>
    )
}

export default AvailableRooms