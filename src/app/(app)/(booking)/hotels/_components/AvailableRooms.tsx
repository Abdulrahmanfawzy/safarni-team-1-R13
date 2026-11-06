<<<<<<< HEAD
import { RoomDummy } from "@/types/room.types";
import roomImg from "@/assets/images/room.jpg"
import RoomCard from "./RoomCard";
interface IProps {
    hotelId: string;
}
const dummyData: RoomDummy[] = [
    {
        id: "1",
        name: "Oasis Overture",
        slug:'Oasis-Overture',
        image: roomImg,
        price: 200,

    },
    {
        id: "2",
        name: "Oasis Overture",
         slug:'',
        image: roomImg,
        price: 200,

    },
    {
        id: "3",
        name: "Oasis Overture",
         slug:'',
        image: roomImg,
        price: 200,

    },
    {
        id: "4",
        name: "Oasis Overture",
         slug:'',
        image: roomImg,
        price: 200,

    },
    {
        id: "5",
        name: "Oasis Overture",
         slug:'',
        image: roomImg,
        price: 200,

    },
    {
        id: "6",
        name: "Oasis Overture",
         slug:'',
        image: roomImg,
        price: 200,

    },
    {
        id: "7",
        name: "Oasis Overture",
         slug:'',
        image: roomImg,
        price: 200,

    },
    {
        id: "8",
        name: "Oasis Overture",
        slug:'',
        image: roomImg,
        price: 200,

    },
 

];
const AvailableRooms = ({ hotelId }: IProps) => {
    return (
        <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4  ">

            {dummyData.map((room) => (
                <div
                    key={room.id}
                    className="w-full min-w-0"
                >
                    <RoomCard room={room} hotelId={hotelId} />
                </div>
            ))}

        </section>
    )
}

export default AvailableRooms
=======
"use client";

import RoomCard from "./RoomCard";
import { useGetHotelRooms } from "@/hooks/hotels/useGetHotelRooms";
import RoomCardSkeleton from "@/components/skeletons/RoomCardSkeleton";
interface IProps {
    hotelId: string;
}

const AvailableRooms = ({ hotelId }: IProps) => {
      const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetHotelRooms(hotelId);

  if (isLoading) {
    return (
      <section
        aria-busy="true"
        aria-label="Loading available rooms"
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <RoomCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <div className="py-8 text-center">
        <p className="text-destructive">Failed to load rooms.</p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 text-primary"
        >
          Try again
        </button>
      </div>
    );
  }

  const rooms = response?.data.rooms ?? [];

  if (rooms.length === 0) {
    return (
      <p className="py-8 text-center text-gray-500">
        No rooms are currently available at this hotel.
      </p>
    );
  }

  return (
    <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {rooms.map((room) => (
        <div key={room.id} className="w-full min-w-0">
          <RoomCard room={room} hotelId={hotelId} />
        </div>
      ))}
    </section>
  );
}

export default AvailableRooms;
>>>>>>> 9044ef1f4853745c6a8b6e12648a3184b2920bd7
