
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import GuestDialog from "./GuestDialog";
import { ChevronLeft } from "lucide-react";

interface IProps {
    onBack: () => void;
}

const checkInDates = [
    { day: "Today", date: "24 Oct" },
    { day: "Sun", date: "25 Oct" },
    { day: "Mon", date: "26 Oct" },
    { day: "Tue", date: "27 Oct" },
];

const checkOutDates = [
    { day: "Sun", date: "1 Nov" },
    { day: "Mon", date: "2 Nov" },
    { day: "Tue", date: "3 Nov" },
    { day: "Wed", date: "4 Nov" },
];

export default function RoomBooking({ onBack }: IProps) {
    const router = useRouter();
    const [checkIn, setCheckIn] = useState(0);
    const [checkOut, setCheckOut] = useState(0);
    const [note, setNote] = useState("");

    const [openDialog, setOpenDialog] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(1);
    const [infants, setInfants] = useState(1);

    const handleBooking = () => {
        setOpenDialog(false);
        router.push("/payment");
    };

    return (
        <>
            <div className="space-y-4">
                {/* Header */}
                <div className="border-t border-gray-200 pt-3 flex items-center justify-center">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onBack}
                        className="flex items-center gap-1.5 self-center p-0 text-lg font-medium text-primary hover:bg-transparent"
                    >
                        <ChevronLeft />
                        <span className="w-full text-center text-lg font-medium text-primary capitalize">Book Room</span>
                    </Button>

                </div>

                {/* Check In */}
                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900">
                        Check In
                    </h3>

                    <div className="grid grid-cols-4 gap-2">
                        {checkInDates.map((item, index) => (
                            <button
                                key={item.date}
                                type="button"
                                onClick={() => setCheckIn(index)}
                                className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-md border px-1 py-2 transition ${checkIn === index
                                    ? "border-[#E1EFFE] bg-[#E1EFFE] text-primary"
                                    : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                                    }`}
                            >
                                <span className="text-[10px]">{item.day}</span>
                                <span className="text-xs font-medium">
                                    {item.date}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Check Out */}
                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900">
                        Check Out
                    </h3>

                    <div className="grid grid-cols-4 gap-2">
                        {checkOutDates.map((item, index) => (
                            <button
                                key={item.date}
                                type="button"
                                onClick={() => setCheckOut(index)}
                                className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-md border px-1 py-2 transition ${checkOut === index
                                    ? "border-[#E1EFFE] bg-[#E1EFFE] text-primary"
                                    : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                                    }`}
                            >
                                <span className="text-[10px]">{item.day}</span>
                                <span className="text-xs font-medium">
                                    {item.date}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Note */}
                <div className="space-y-2">
                    <label
                        htmlFor="owner-note"
                        className="text-sm font-medium text-gray-900"
                    >
                        Note To Owner
                    </label>

                    <Textarea
                        id="owner-note"
                        placeholder="Enter here"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="min-h-24 resize-none border-0 bg-[#F3F4F6] px-3 py-3 text-sm shadow-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                </div>

                {/* Submit opens Dialog */}
                <Button
                    type="button"
                    onClick={() => setOpenDialog(true)}
                    className="h-14 w-full rounded-md bg-primary "
                >
                    Submit
                </Button>


            </div>

            {/* Guests Dialog */}
            <GuestDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                adults={adults}
                setAdults={setAdults}
                childrenCount={children}
                setChildrenCount={setChildren}
                infants={infants}
                setInfants={setInfants}
                onConfirm={handleBooking}
            />
        </>
    );
}
