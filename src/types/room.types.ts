import { StaticImageData } from "next/image";

export interface RoomDummy {
  id: string;
  name: string;
  image: string | StaticImageData;
  price: number;
  
}