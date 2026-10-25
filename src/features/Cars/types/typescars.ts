import { StaticImageData } from "next/image";

interface TypeBranding {
    id: number;
    name: string;
    image: StaticImageData;
    quntatiy: string;
}
export type { TypeBranding }
interface CarPopularTypes { 
    id:number;
    name: string;
    image: StaticImageData;
    type:string ; 
    seats:string ;
    Turn:string;
}
export type {CarPopularTypes}
export type Spec = { label: string; value: string };
export type Plan = {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: React.ElementType;
};