
"use client";

import { useState } from "react";
import { useRoomAvailability } from "./useRoomAvailability";

export function useRoomBooking(roomId: number) {
  // Current date
  const today = new Date();

  const todayDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  // Calendar states
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  // Selected booking dates
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);

  // Fetch room availability
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useRoomAvailability(roomId, month, year);

  // Extract availability data
  const disabledDates = data?.data?.disabled_dates ?? [];
  const bookedRanges = data?.data?.booked_ranges ?? [];

  // Get number of days in selected month
  const daysInMonth = new Date(year, month, 0).getDate();

  // Generate dates for current month
  const dates = Array.from(
    { length: daysInMonth },
    (_, index) => {
      const day = index + 1;

      return [
        year,
        String(month).padStart(2, "0"),
        String(day).padStart(2, "0"),
      ].join("-");
    }
  );

  // Format date for UI
  const getDateParts = (date: string) => {
    const parsedDate = new Date(`${date}T12:00:00`);

    return {
      day: parsedDate.toLocaleDateString("en-US", {
        weekday: "short",
      }),

      date: parsedDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      }),
    };
  };

  // Check if date is booked
  const isDateDisabled = (date: string) => {
    return disabledDates.includes(date);
  };

  // Check if selected stay overlaps booked nights
  const hasBookedNight = (
    checkInDate: string,
    checkOutDate: string
  ) => {
    return disabledDates.some(
      (date) => date >= checkInDate && date < checkOutDate
    );
  };

  // Check-in dates: get next 4 available dates
  const checkInOptions = dates
    .filter(
      (date) =>
        date >= todayDate && !isDateDisabled(date)
    )
    .slice(0, 4);

  // Check-out dates: get next 4 valid dates
  const checkOutOptions = checkIn
    ? dates
        .filter(
          (date) =>
            date > checkIn &&
            !hasBookedNight(checkIn, date)
        )
        .slice(0, 4)
    : [];

  // Select check-in date
  const selectCheckIn = (date: string) => {
    if (isDateDisabled(date) || date < todayDate) return;

    setCheckIn(date);
    setCheckOut(null);
  };

  // Check if checkout date is invalid
  const isCheckOutDisabled = (date: string) => {
    if (!checkIn) return true;

    if (date <= checkIn) return true;

    return hasBookedNight(checkIn, date);
  };

  // Select check-out date
  const selectCheckOut = (date: string) => {
    if (isCheckOutDisabled(date)) return;

    setCheckOut(date);
  };

  // Change calendar month
  const changeMonth = (direction: "prev" | "next") => {
    const newDate = new Date(
      year,
      month - 1 + (direction === "next" ? 1 : -1)
    );

    const newMonth = newDate.getMonth() + 1;
    const newYear = newDate.getFullYear();

    // Prevent navigating to past months
    const currentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const selectedMonth = new Date(
      newYear,
      newMonth - 1,
      1
    );

    if (selectedMonth < currentMonth) return;

    setMonth(newMonth);
    setYear(newYear);

    // Reset selected dates when changing month
    setCheckIn(null);
    setCheckOut(null);
  };

  // Validate booking selection
  const isBookingValid = Boolean(
    checkIn &&
    checkOut &&
    checkOut > checkIn &&
    !hasBookedNight(checkIn, checkOut)
  );

  // Reset booking dates
  const resetDates = () => {
    setCheckIn(null);
    setCheckOut(null);
  };

  return {
    // Calendar
    month,
    year,
    dates,
    changeMonth,

    // Date formatting
    getDateParts,

    // Check-in
    checkIn,
    checkInOptions,
    selectCheckIn,

    // Check-out
    checkOut,
    checkOutOptions,
    selectCheckOut,
    isCheckOutDisabled,

    // Availability
    disabledDates,
    bookedRanges,
    isDateDisabled,
    hasBookedNight,

    // Query states
    isLoading,
    isError,
    error,
    refetch,

    // Booking validation
    isBookingValid,
    resetDates,
  };
}
