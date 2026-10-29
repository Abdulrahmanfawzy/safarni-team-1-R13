"use client";

import CarBookingCard from "@/features/Cars/components/CarCardBooking";

export default function Page() {
    return (
        <div className="absolute inset-x-4 bottom-4">
            <CarBookingCard
                name="S 500 Sedan"
                imageSrc="/images/s500.png"
                transmission="Automatic"
                seats={5}
                fuel="Diesel"
                pricePerHour={80}
                pricePerDay={400}
                onConfirm={() => console.log("confirmed")}
            />
        </div>
    );
}