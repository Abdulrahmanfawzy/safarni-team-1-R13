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