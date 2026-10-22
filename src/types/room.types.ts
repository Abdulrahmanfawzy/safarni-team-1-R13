import { StaticImageData } from "next/image";

export interface RoomDummy {
  id: string;
  name: string;
  slug: string,
  image: string | StaticImageData;
  price: number;
  
}