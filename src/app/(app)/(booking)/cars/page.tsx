import RequestCars from "@/api/Cars";
import Brands from "@/features/Cars/components/Brands";
import PopularCar from "@/features/Cars/components/PopularCar";
import SearchBar from "@/features/search-filter/components/SearchBar";
import type { CarBrand, CarListItem } from "@/api/Cars";
import { Suspense } from "react";

async function CarsContent() {
    let cars: CarListItem[] = [];
    let brands: CarBrand[] = [];
    let errorMessage = "";

    try {
        const result = await RequestCars(5);
        cars = result.cars;
        brands = result.brands;
    } catch (error) {
        errorMessage = error instanceof Error ? error.message : "Unable to load cars.";
    }
    return (
        <div className="mx-auto w-full">
            <main className="container mx-auto mt-5 max-w-7xl">
                <SearchBar />
                <Brands brands={brands} />
                <PopularCar cars={cars} errorMessage={errorMessage} />
            </main>
        </div>
    );
}

export default function CarsPage() {
    return (
        <Suspense fallback={<div className="container mx-auto max-w-7xl py-12 text-center text-sm text-neutral-500">Loading cars...</div>}>
            <CarsContent />
        </Suspense>
    );
}
