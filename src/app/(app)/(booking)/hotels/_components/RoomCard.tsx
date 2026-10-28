import { RoomDummy } from "@/types/room.types"
import Image from "next/image"
import Link from "next/link"

interface IProps {

    room: RoomDummy;
    hotelId: string;
}

const RoomCard = ({ room, hotelId }: IProps) => {
    return (
        <Link href={`/hotel/${hotelId}/${room.slug}`} className="block w-full min-w-0">
            <article className="w-full overflow-hidden flex flex-col gap-4 p-4 rounded-3xl bg-primary-foreground shadow-[0px_0px_26.37px_0px_#6F6F6F40]">
                <div className="relative w-full shrink-0 overflow-hidden aspect-4/3 rounded-lg">
                    <Image src={room.image}
                        fill alt={room.name}
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                   
                </div>
                 <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-medium text-gray-900 leading-[100%]">
                            {room.name}
                        </h3>

                        <p className="text-lg font-medium text-gray-400 leading-6">
                            From{" "}
                            <span className="text-blue-600">
                                {room.price}$
                            </span>{" "}
                            Per Night
                        </p>
                    </div>
            </article>
        </Link>
    )
}

export default RoomCard