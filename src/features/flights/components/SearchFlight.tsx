
"use client";

import FlightsDialog from "./FlightsDialog";
import TripTypeTabs from "./TripType";
import SelectPassenger from "./SelectPassenger";
import CalenderTicket from "./CalenderTicket";
import ImagePlane from "../shared/ImagePlane";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { inputClass, inputContainerClass, labelClass } from "../styles/style";
import Flights from "@/assets/images/1f333dd2b89d7ab8cf544bc5d5b4878e6d6f2f3c.png";
import { useFlightSearch } from "@/features/flights/hooks/useFlightSearch";

const textFields = [
  { id: "location", label: "Location", placeholder: "Montreal, Canada" },
  { id: "destination", label: "Destination", placeholder: "Tokyo, Japan" },
];

const SearchFlight = () => {
  const {
    tripType,
    departure,
    returnDate,
    passengerCount,
    selectedFlightIds,
    isDialogOpen,
    canSearch,
    setTripType,
    setDeparture,
    setReturnDate,
    setPassengerCount,
    selectFlight,
    setDialogOpen,
  } = useFlightSearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSearch) setDialogOpen(true);
  };

  return (
    <>
      <section className="w-full flex items-start justify-center py-6 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <main className="w-full container mx-auto flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16">
          <ImagePlane image={Flights} />

          <div className="w-full max-w-md sm:max-w-lg md:max-w-none md:w-7/12 lg:w-[50%] xl:w-[45%] 2xl:w-[42%] flex flex-col gap-4 sm:gap-5">
            <TripTypeTabs value={tripType} onChange={setTripType} />

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-3.5">
              {textFields.map(({ id, label, placeholder }) => (
                <div key={id} className="flex flex-col gap-1">
                  <label htmlFor={id} className={labelClass}>
                    {label}
                  </label>
                  <Input
                    id={id}
                    type="text"
                    placeholder={placeholder}
                    containerClassName={inputContainerClass}
                    className={inputClass}
                  />
                </div>
              ))}

              <CalenderTicket
                tripType={tripType}
                departure={departure}
                setDeparture={setDeparture}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
              />

              <div className="flex flex-col gap-1">
                <SelectPassenger
                  labelClass={labelClass}
                  value={passengerCount}
                  onValueChange={setPassengerCount}
                />
              </div>

              <button
                type="submit"
                disabled={!canSearch}
                className={cn(
                  "mt-2 sm:mt-3 w-full h-11 sm:h-12 rounded-xl bg-primary text-white text-sm sm:text-base font-semibold hover:bg-primary/90 active:scale-[0.99] transition-all cursor-pointer shadow-xs hover:shadow-md",
                  !canSearch && "opacity-50 cursor-not-allowed",
                )}
              >
                Search Flights
              </button>
            </form>
          </div>
        </main>
      </section>

      <FlightsDialog
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
        departureDate={departure}
        returnDate={returnDate}
        passengerCount={passengerCount}
        selectedDepartureFlightId={selectedFlightIds.departure}
        selectedReturnFlightId={selectedFlightIds.return}
        onSelect={selectFlight}
      />
    </>
  );
};

export default SearchFlight;