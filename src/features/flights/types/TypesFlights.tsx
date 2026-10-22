import { LucideIcon } from "lucide-react";

export interface TripType {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface Passenger {
  label: string;
  value: string;
}

export type Flight = {
  id: string;
  departTime: string;
  arriveTime: string;
  from: string;
  to: string;
  duration: string;
  layover: string;
  airline: string;
  price: number;
};

export type CalenderTicketProps = {
  tripType: "round" | "one-way" | "multi";
  departure?: Date | undefined;
  setDeparture?: (date: Date | undefined) => void;
  returnDate?: Date | undefined;
  setReturnDate?: (date: Date | undefined) => void;
  onDepartureChange?: (date: Date | undefined) => void;
  onReturnDateChange?: (date: Date | undefined) => void;
};

export type PropsDepartureDate = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departureDate?: Date | string | undefined;
  returnDate?: Date | string | undefined;
  onSelect?: (flight: Flight, leg: "departure" | "return") => void;
  selectedDepartureFlight?: Flight | null;
  selectedReturnFlight?: Flight | null;
};
