import { ArrowRight, RefreshCw } from "lucide-react";
import { Flight, Passenger, TripType } from "../types/TypesFlights";

export const tripTypes: TripType[] = [
    { id: "round", label: "Round Trip", icon: RefreshCw },
    { id: "multi", label: "Multi City", icon: RefreshCw },
    { id: "one-way", label: "One Way", icon: ArrowRight },
] as const;

export const passengers: Passenger[] = [
    { label: "1 Passenger", value: "1" },
    { label: "2 Passengers", value: "2" },
    { label: "3 Passengers", value: "3" },
];
export const getFlights = (date: string): Flight[] => [
    { id: `${date}-1`, departTime: "7:05 AM", arriveTime: "8:55 PM", from: "YUL", to: "YUL", duration: "18:55", layover: "1 layover: YYZ (3:55)", airline: "Scoot", price: 1300 },
    { id: `${date}-2`, departTime: "9:05 AM", arriveTime: "4:05 PM", from: "YUL", to: "YUL", duration: "18:55", layover: "1 layover: YYZ (3:55)", airline: "Scoot", price: 1400 },
    { id: `${date}-3`, departTime: "9:05 AM", arriveTime: "4:55 PM", from: "YUL", to: "YUL", duration: "18:55", layover: "1 layover: YYZ (3:55)", airline: "Scoot", price: 1300 },
];