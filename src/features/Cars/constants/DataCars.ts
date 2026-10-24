import Mercedes from "@/assets/images/Merc.png"
import Sedan from "@/assets/images/e744f4cf979ec01abb63356b5a84a958a241a35d.png"
import { CarPopularTypes, Plan, TypeBranding } from "../types/typescars"
import { Clock, CalendarDays, MapPin } from "lucide-react";

export const BrandsData: TypeBranding[] = [
    {
        id: 1,
        name: "Mercedes",
        image: Mercedes,
        quntatiy: "+20"

    },

    {
        id: 4,
        name: "Mercedes",
        image: Mercedes,
        quntatiy: "+20"

    },
    {
        id: 3,
        name: "Mercedes",
        image: Mercedes,
        quntatiy: "+20"

    },
    {
        id: 2,
        name: "Mercedes",
        image: Mercedes,
        quntatiy: "+20"

    },
    {
        id: 5,
        name: "Mercedes",
        image: Mercedes,
        quntatiy: "+20"

    },
    {
        id: 6,
        name: "Mercedes",
        image: Mercedes,
        quntatiy: "+20"

    },
    {
        id: 7,
        name: "Mercedes",
        image: Mercedes,
        quntatiy: "+20"

    }

]
export const PopularCarData: CarPopularTypes[] = [
    {
        id: 1,
        name: "S 500 Sedan ",
        image: Sedan,
        type: "AutoMatic ",
        seats: "5 Seat",
        Turn: "Diesel"
    },
    {
        id: 2,
        name: "S 500 Sedan ",
        image: Sedan,
        type: "AutoMatic ",
        seats: "5 Seat",
        Turn: "Diesel"
    },
    {
        id: 3,
        name: "S 500 Sedan ",
        image: Sedan,
        type: "AutoMatic ",
        seats: "5 Seat",
        Turn: "Diesel"
    },
    {
        id: 4,
        name: "S 500 Sedan ",
        image: Sedan,
        type: "AutoMatic ",
        seats: "5 Seat",
        Turn: "Diesel"
    },
]

export const specs: Spec[] = [
    { label: "Power", value: "429 hp @ 6,100 rpm" },
    { label: "Top Speed", value: "280 km/h" },
    { label: "Acceleration", value: "4.9 sec 0-60 mph" },
];


export const plans: Plan[] = [
    {
        id: "hourly",
        title: "Hourly Rent",
        description: "Best for business appointments",
        price: 10,
        icon: Clock,
    },
    {
        id: "daily",
        title: "Hourly Rent",
        description: "Best for business appointments",
        price: 80,
        icon: CalendarDays,
    },
];