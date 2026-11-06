
"use client";

import FlightsDialog from "./FlightsDialog";
import TripTypeTabs from "./TripType";

import ImagePlane from "../shared/ImagePlane";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { inputClass, inputContainerClass, labelClass } from "../styles/style";
import Flights from "@/assets/images/1f333dd2b89d7ab8cf544bc5d5b4878e6d6f2f3c.png";
import { useFlightSearch } from "@/features/flights/hooks/useFlightSearch";
import CalenderTicket from "./CalenderTicket";
import { SearchFlightsAction } from "@/actions/Flights";
import { useState } from "react";
import { format } from "date-fns";
import { extractFlights } from "../utils/flightSearch";

interface SearchFlightProps {
  initialApiFlights?: any;
}

const SearchFlight = ({ initialApiFlights }: SearchFlightProps) => {
  const [apiFlights, setApiFlights] = useState(initialApiFlights);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const {
    tripType,
    departure,
    returnDate,
    location,
    destination,
    selectedFlightIds,
    isDialogOpen,
    canSearch,
    setTripType,
    setDeparture,
    setReturnDate,
    setLocation,
    setDestination,

    setDialogOpen,
  } = useFlightSearch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSearch || isSearching) return;

    setIsSearching(true);
    setSearchError("");
    try {
      const response = await SearchFlightsAction({
        type: tripType,
        location,
        dest: destination,
        departure: departure ? format(departure, "yyyy-MM-dd") : undefined,
        return: returnDate ? format(returnDate, "yyyy-MM-dd") : undefined,
      });
      if (response?.error) {
        setSearchError(response.error);
        return;
      }

      const flights = extractFlights(response);
      if (!flights) {
        setSearchError("Flight search returned an unexpected response. Please try again.");
        console.error("Unexpected flight search response:", response);
        return;
      }
      if (flights.length === 0) {
        setSearchError("No flights were found for these dates and locations.");
        return;
      }
      setApiFlights(response);
      setDialogOpen(true);
    } catch {
      setSearchError("Unable to connect to the flight search service. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <section className="w-full flex items-start justify-center py-6 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <main className="w-full container mx-auto flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16">
          <ImagePlane image={Flights} />

          <div className="w-full max-w-md sm:max-w-lg md:max-w-none md:w-7/12 lg:w-[50%] xl:w-[45%] 2xl:w-[42%] flex flex-col gap-4 sm:gap-5">
            <TripTypeTabs value={tripType} onChange={setTripType} />

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-3.5">
              <div className="flex flex-col gap-1">
                <label htmlFor="location" className={labelClass}>
                  Location
                </label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Montreal, Canada"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  containerClassName={inputContainerClass}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="destination" className={labelClass}>
                  Destination
                </label>
                <Input
                  id="dest"
                  type="text"
                  placeholder="Tokyo, Japan"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  containerClassName={inputContainerClass}
                  className={inputClass}
                />
              </div>

              <CalenderTicket
                tripType={tripType}
                departure={departure}
                setDeparture={setDeparture}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
              />

              <button
                type="submit"
                disabled={!canSearch || isSearching}
                className={cn(
                  "mt-2 sm:mt-3 w-full h-11 sm:h-12 rounded-xl bg-primary text-white text-sm sm:text-base font-semibold hover:bg-primary/90 active:scale-[0.99] transition-all cursor-pointer shadow-xs hover:shadow-md",
                  !canSearch && "opacity-50 cursor-not-allowed",
                )}
              >
                {isSearching ? "Searching..." : "Search Flights"}
              </button>
              {searchError && <p role="alert" className="text-sm text-red-600">{searchError}</p>}
            </form>
          </div>
        </main>
      </section>

      <FlightsDialog
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
        departureDate={departure}
        returnDate={returnDate}
        selectedDepartureFlightId={selectedFlightIds.departure}
        selectedReturnFlightId={selectedFlightIds.return}
        // onSelect={(flight, leg) => selectFlight(flight.id, leg)}
        apiFlights={apiFlights}
      />
    </>
  );
};

export default SearchFlight;
