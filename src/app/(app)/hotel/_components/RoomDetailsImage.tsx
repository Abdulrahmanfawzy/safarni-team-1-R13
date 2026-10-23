
import Image from "next/image";
import roomImg from "@/assets/images/room-details.svg";
import { BackButton } from "@/components/shared/BackButton";

export default function RoomDetailsImage() {
  return (
    <section className="relative hidden items-center justify-center  lg:flex lg:flex-col lg:pr-0">
      <div className="absolute left-9 top-3 cursor-pointer">
        <BackButton />
      </div>

      <Image
        src={roomImg}
        alt="Room details illustration"
        width={508}
        height={602}
        priority
        className="object-contain mt-19 ml-8"
      />
    </section>
  );
}
